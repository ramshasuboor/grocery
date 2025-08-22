import Invoice from "../models/invoiceModel.js"

//  add new invoice
export const addInvoice = async (req, res) => {
  try {
    const newInvoice = new Invoice(req.body);
    await newInvoice.save();
    res.status(201).json({ success: true, data: newInvoice });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
};

// get all invoices

export const getInvoices = async (req,res) =>{
     try {
    const invoices = await Invoice.find().sort({ createdAt: -1 });
    res.json({ success: true, data: invoices });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
}


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

