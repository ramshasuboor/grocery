import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import Product from "./routes/productRoute.js";
import Customer from "./routes/customerRoute.js";
import Supplier from "./routes/supplierRoute.js";
import Invoice from "./routes/invoiceRoute.js";

const app = express();

const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173"];

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Routes
app.use("/api/v1/product", Product);
app.use("/api/v1/customer", Customer);
app.use("/api/v1/supplier", Supplier);
app.use("/api/v1/invoice", Invoice);


app.get("/", (req, res) => {
  res.send("<h1>API is Working!!! </h1>");
});

export default app;
