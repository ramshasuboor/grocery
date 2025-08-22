import express from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController.js";

const router = express.Router();

router.post("/add", addCustomer);
router.get("/all", getCustomers);
router.get("/show/:id", getCustomer);
router.patch("/update/:id", updateCustomer);
router.delete("/delete/:id", deleteCustomer);

export default router;
