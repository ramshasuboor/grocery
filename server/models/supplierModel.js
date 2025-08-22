import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const supplierSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required."],
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
    },
    company: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    opening_balance: {
      type: Number,
    },
    closing_balance: {
      type: Number,
    },
  },
  { timestamps: true }
);
supplierSchema.plugin(mongoosePaginate);

export const Supplier = mongoose.model("Supplier", supplierSchema);
