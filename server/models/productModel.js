import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product Name is required."],
    },
    price: {
      type: Number,
      required: [true, "Product Price is required."],
    },
    opening_stock: {
      type: Number,
    },
    closing_stock: {
      type: Number,
    },
    unit: {
      type: String,
      enum: ["Kg", "No", "Ltr", "Pkt"],
      default: "Kg",
    },
  },
  { timestamps: true }
);

productSchema.plugin(mongoosePaginate);

export const Product = mongoose.model("Product", productSchema);
