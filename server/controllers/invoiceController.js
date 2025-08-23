

//  add new invoice
import Invoice from "../models/invoiceModel.js"

// Add new invoice
export const addInvoice = async (req, res) => {
  try {
    // Last invoice find kar lo
    const lastInvoice = await Invoice.findOne().sort({ invoiceNo: -1 });

    const lastNo = lastInvoice && !isNaN (lastInvoice.invoiceNo) ? Number(lastInvoice.invoiceNo): 0;

    const newInvoiceNo = lastNo + 1;

    // Ab ek hi invoice banao
    const invoice = new Invoice({
      ...req.body,
      invoiceNo: newInvoiceNo,
    });

    await invoice.save();

    res.status(201).json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// get all invoices

// export const getInvoices = async (req,res) =>{
//      try {
//     const invoices = await Invoice.find().sort({ createdAt: -1 });
    

//     res.json({ success: true, data: invoices });
//   } catch (err) {
//     res.status(500).json({ success: false, error: err.message });
//   }
// }
export const getInvoices = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "" } = req.query;

    const query = {};

    // If search term is provided, search by customer name or invoice number
    if (search) {
      query.$or = [
        { "customer.name": { $regex: search, $options: "i" } },
        { invoiceNo: parseInt(search) || 0 }
      ];
    }

    const total = await Invoice.countDocuments(query);
    const invoices = await Invoice.find(query)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json({
      success: true,
      data: invoices,
      pagination: {
        total,
        limit: parseInt(limit),
        page: parseInt(page),
        pages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
        nextPage: page * limit < total ? parseInt(page) + 1 : null,
        prevPage: page > 1 ? parseInt(page) - 1 : null,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};


// get single invoice
export const getInvoice = async (req,res) =>{
    try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }
    res.json({ success: true, data: invoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}

// update invoice

export const updateInvoice = async (req,res) =>{
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
export const deleteInvoice = async (req,res) =>{
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

export const getNextInvoiceNo= async (req,res) =>{
 try {
    const lastInvoice = await Invoice.findOne().sort({ createdAt: -1 });
    const nextInvoiceNo = lastInvoice ? lastInvoice.invoiceNo + 1 : 1;
    res.json({ success: true, nextInvoiceNo });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};
