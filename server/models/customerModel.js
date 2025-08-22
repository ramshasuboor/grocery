import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const customerSchema = new mongoose.Schema(
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

customerSchema.plugin(mongoosePaginate);

export const Customer = mongoose.model("Customer", customerSchema);
