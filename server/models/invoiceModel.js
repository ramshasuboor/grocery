import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
  customer: {
    type: Object, // direct customer details save karne ke liye
    required: true,
  },
  rows: [
    {
      product: String,
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
