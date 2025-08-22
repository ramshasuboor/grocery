import express from "express";
import {
  addInvoice,getInvoice,getInvoices,deleteInvoice,updateInvoice
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/add", addInvoice);
router.get("/all", getInvoices);
router.get("/show/:id", getInvoice);
router.patch("/update/:id", updateInvoice);
router.delete("/delete/:id", deleteInvoice);

export default router;