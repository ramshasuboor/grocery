import express from "express";
import {
  addSupplier,
  deleteSupplier,
  getSupplier,
  getSuppliers,
  updateSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

router.post("/add", addSupplier);
router.get("/all", getSuppliers);
router.get("/show/:id", getSupplier);
router.patch("/update/:id", updateSupplier);
router.delete("/delete/:id", deleteSupplier);

export default router;
