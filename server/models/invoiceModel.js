import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customer: {
   type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",   // ✅ Model name सही होना चाहिए
  required: function() { return this.customer !== null; } 
  },
  rows: [
    {
      product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Product collection ka naam
    },
      avgQty: Number,
      quantity: Number,
      mrp: Number,
      discount: Number,
      total: Number,
    },
  ],
  totals: {
    totalAmount: Number,
    totalDiscount: Number,
    grossTotal: Number,
  },
  paidAmount: Number,
  balanceAmount: Number,
invoiceNo: {
      type: Number,
      required: true,
      unique: true, // har invoice ek hi baar ho
    },
  date: String,
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
