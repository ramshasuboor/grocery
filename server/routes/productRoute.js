import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
  updateProductStock
} from "../controllers/productController.js";

const router = express.Router();

router.post("/add", addProduct);
router.get("/all", getProducts);
router.get("/show/:id", getProduct);
router.patch("/update/:id", updateProduct);
router.delete("/delete/:id", deleteProduct);
router.patch("/update-stock/:id", updateProductStock);

export default router;
