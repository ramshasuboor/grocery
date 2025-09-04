


// Add new invoice
import mongoose from "mongoose";
import Invoice from "../models/invoiceModel.js";

export const addInvoice = async (req, res) => {
  console.log(req.body, "customerId")
  try {

    const invoice = new Invoice({
      customer: req.body.customer,   // 👈 ObjectId hona chahiye
      customerName: req.body.customerName,
      rows: req.body.rows.map(row => ({
        product: row.product,   // 👈 yaha tum row.product bhej rahe ho frontend se
        quantity: row.quantity,
        mrp: row.mrp,
        discount: row.discount,
        total: row.total,
        unit: row.unit || "pcs",
      })),
      totals: req.body.totals,
      paidAmount: req.body.paidAmount,
      balanceAmount: req.body.balanceAmount,
      invoiceNo: req.body.invoiceNo || ("INV-" + new Date().getTime()), // agar frontend se nahi aata
      date: req.body.date || new Date().toLocaleDateString(),
    });
    // console.log(req.body,"customerId")
    // const newClosingBalance = customer. closing_balance + balanceAmount
    // console.log(newClosingBalance,"new Closing Balance")
    await invoice.save();

    // populate kar do taki customer aur product ka detail aa jaye
    const populatedInvoice = await Invoice.findById(invoice._id)
      .populate("customer", "name address mobile")
      .populate("rows.product", "name unit mrp");

    res.status(201).json({ success: true, data: populatedInvoice });
  } catch (err) {
    console.error("Error saving invoice:", err);
    res.status(500).json({ success: false, error: err.message });
  }
};

//  get all invoices
export const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? {
          $or: [
            { invoiceNo: { $regex: search, $options: "i" } },
            { customerName: { $regex: search, $options: "i" } }
          ]
        }
      : {};

    const invoices = await Invoice.find(query)
      .populate("customer", "name email mobile address")
      .populate("rows.product", "name unit")
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    const total = await Invoice.countDocuments(query);

    res.status(200).json({
      success: true,
      data: invoices,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




// get single invoice
export const getInvoice = async (req, res) => {
  console.log("Invoice request aayi with ID:", req.params.id);
  try {
    const invoice = await Invoice.findById(req.params.id)
      .populate("customer", "name address mobile")
      .populate("rows.product", "name unit mrp");
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }
    res.json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// update invoice

export const updateInvoice = async (req, res) => {
  try {
    const updatedInvoice = await Invoice.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // naya updated data return karega
    );

    if (!updatedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    res.json({ success: true, data: updatedInvoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}


// delete invioce
export const deleteInvoice = async (req, res) => {
  try {
    const deletedInvoice = await Invoice.findByIdAndDelete(req.params.id);
    if (!deletedInvoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }
    res.json({ success: true, message: "Invoice deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

export const getNextInvoiceNo = async (req, res) => {
  try {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    const nextInvoiceNo = lastInvoice ? lastInvoice.invoiceNo + 1 : 1;
    res.json({ success: true, nextInvoiceNo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
