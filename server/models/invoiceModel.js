import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },

    // 👇 Ab sahi jagah par
    customerName: { type: String, required: true },
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
      unit: String,
    },
  ],
  totals: {
    totalAmount: Number,
    totalDiscount: Number,
    grossTotal: Number,
    openingBalance: Number,
    closingBalance: Number,
  },
  paidAmount: Number,
  balanceAmount: Number,
invoiceNo: {
      type: String,
      required: true,
      unique: true, // har invoice ek hi baar ho
    },
  date: String,
}, { timestamps: true });

export default mongoose.model("Invoice", invoiceSchema);
