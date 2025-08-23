import express from "express";
import {
  addInvoice,getInvoice,getInvoices,deleteInvoice,updateInvoice,getNextInvoiceNo
} from "../controllers/invoiceController.js";

const router = express.Router();

router.post("/add", addInvoice);
router.get("/all", getInvoices);
router.get("/show/:id", getInvoice);
router.patch("/update/:id", updateInvoice);
router.delete("/delete/:id", deleteInvoice);
router.get("/nextNo", getNextInvoiceNo);

export default router;