


// Add new invoice
import mongoose from "mongoose";
import Invoice from "../models/invoiceModel.js";

// export const addInvoice = async (req, res) => {
//   try {
//     // Get last invoice number
//     const lastInvoice = await Invoice.findOne().sort({ invoiceNo: -1 });
//     const lastNo =
//       lastInvoice && !isNaN(lastInvoice.invoiceNo)
//         ? Number(lastInvoice.invoiceNo)
//         : 0;

//     const newInvoiceNo = lastNo + 1;

//     // Prepare rows: convert product to ObjectId
//     const rows = req.body.rows.map((r) => ({
//       product: r.product !== "cash" ? mongoose.Types.ObjectId(r.product) : null,
//       quantity: r.quantity,
//       mrp: r.mrp,
//       discount: r.discount,
//       total: r.total,
//       avgQty: r.avgQty || 0,
//     }));

//     // Handle Cash Sale (customer can be null)
//     const customerId =
//       req.body.customer === "cash" ? null : mongoose.Types.ObjectId(req.body.customer);

//     let invoice = new Invoice({
//       customer: customerId,
//       rows,
//       totals: req.body.totals,
//       paidAmount: req.body.paidAmount,
//       balanceAmount: req.body.balanceAmount,
//       invoiceNo: newInvoiceNo,
//       date: new Date().toLocaleDateString(),
//     });

//     await invoice.save();

//     // Populate customer and product names
//     invoice = await invoice.populate("customer").populate("rows.product", "name");

//     res.status(201).json({ success: true, data: invoice });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };


// Get all invoices

// export const addInvoice = async (req, res) => {
//   try {
//     // const lastInvoice = await Invoice.findOne().sort({ invoiceNo: -1 });
//     // const lastNo =
//     //   lastInvoice && !isNaN(lastInvoice.invoiceNo)
//     //     ? Number(lastInvoice.invoiceNo)
//     //     : 0;

//     // const newInvoiceNo = lastNo + 1;
//     const newInvoiceNo = "INV-" + new Date().toISOString().replace(/[-:.TZ]/g, "").slice(0, 14);

//     // helper
//     const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

//     // rows
//     const rows = req.body.rows.map((r) => ({
//       product: isValidObjectId(r.product) ? new mongoose.Types.ObjectId(r.product) : null,
//       quantity: r.quantity,
//       mrp: r.mrp,
//       discount: r.discount,
//       total: r.total,
//       avgQty: r.avgQty || 0,
//       unit: r.unit || "pcs",
//     }));

//     // customer
//     const customerId = isValidObjectId(req.body.customerId)
//       ? new mongoose.Types.ObjectId(req.body.customerId)
//       : null;

//     let invoice = new Invoice({
//       customerId, // null bhi allowed hoga
//       customerName: req.body.customerName,
//       rows,
//       totals: req.body.totals,
//       paidAmount: req.body.paidAmount,
//       balanceAmount: req.body.balanceAmount,
//       invoiceNo: newInvoiceNo,
//       date: new Date().toLocaleDateString(),
//     });

//     await invoice.save();

//     invoice = await Invoice.findById(invoice._id).populate("customerId","name address mobile").populate("rows.product", "name unit mrp");

//     res.status(201).json({ success: true, data: invoice });
//   } catch (err) {
//     console.error("Error saving invoice:", err);
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

export const addInvoice = async (req, res) => {
   console.log(req.body,"customerId")
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

// export const getInvoices = async (req, res) => {
//   try {
//     const { page = 1, limit = 10, search = "" } = req.query;

//     const query = {};

//     // search term (customer ke liye alag handle karna hoga)
//     if (search) {
//       query.invoiceNo = parseInt(search)
//       if (!isNaN(num)) {
//     query.invoiceNo = num;
//   }
//     }

//     const total = await Invoice.countDocuments(query);
//     const invoices = await Invoice.find(query)
//       .sort({ createdAt: -1 })
//       .skip((page - 1) * limit)
//       .limit(parseInt(limit))
//       // ✅ yaha populate add karo
//       .populate("customerId","name address mobile").populate("rows.product", "name unit mrp");

//     res.json({
//       success: true,
//       data: invoices,
//       pagination: {
//         total,
//         limit: parseInt(limit),
//         page: parseInt(page),
//         pages: Math.ceil(total / limit),
//         hasNextPage: page * limit < total,
//         hasPrevPage: page > 1,
//         nextPage: page * limit < total ? parseInt(page) + 1 : null,
//         prevPage: page > 1 ? parseInt(page) - 1 : null,
//       },
//     });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// };

export const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = search
      ? { "customer.name": { $regex: search, $options: "i" } }
      : {};

    const invoices = await Invoice.find(query)
      .populate("customer", "name email mobile address")
      .populate("rows.product", "name unit")
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    console.log("📌 Found invoices:", invoices.length);
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
      .populate("customer","name address mobile")
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
