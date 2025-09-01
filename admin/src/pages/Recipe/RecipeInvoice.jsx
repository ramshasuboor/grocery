

import React, { useRef } from "react";
import { useEffect } from "react";

import { useLocation } from "react-router-dom";
import "./RecipeInvoice.css";

const RecipeInvoice = () => {
    const location = useLocation();
    const { customer, dish, dishQty, unit, ingredients, grandTotal, invoiceNo, date } =
        location.state || {};
  const printRRef = useRef();

    useEffect(() => {
      if (printRRef.current) {
        printRRef.current.focus();
      }
    }, []);
const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

    return (
        <div className="invoice-container">
            {/* Header */}
            <div className="invoice-header">
                <div className="company-name">AWS Stores</div>
                <div className="company-details">
                    <div>Mobile-No: 9922554433</div>
                    <div>Address: Galib Road Warispura Kamptee.</div>
                </div>
            </div>

            {/* Invoice details */}
            <div className="invoice-details">
                <div className="billing-section">
                    <div className="section-title">Bill To</div>
                    <div className="client-details">
                        <div>{customer?.name || ""}</div>
                        <div>{customer?.address || ""}</div>
                        <div>{customer?.mobile || ""}</div>
                    </div>
                </div>

                <div className="date-section">
                    <div>
                        <span className="date-label">Invoice No#:</span> INV-{invoiceNo}
                    </div>
                    <div className="mt-2">
                        <span className="date-label">Date:</span>{" "}
                        {date ? new Date(date).toLocaleDateString("en-GB") : ""}
                    </div>
                </div>
            </div>

            {/* Ingredients Table */}
            <table className="invoice-table">
                <thead>
                    <tr>
                        <th>सामान का विवरण</th>
                        <th>मात्रा</th>
                        <th>इकाई</th>
                        <th>प्रति दर</th>
                        <th>कुल</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients?.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.qty * dishQty}</td>
                            <td>{item.unit}</td>
                            <td>₹{item.pricePerKg}</td>
                            <td>₹{item.total}</td>
                        </tr>
                    ))}
                       <tr className="grand-total-row">
                        <td colSpan="4">
                            <strong>Grand Total</strong>
                        </td>
                        <td><strong>₹{grandTotal}</strong></td>
                    </tr>
                </tbody>
            </table>
            <div className="print-button-container">
                <button className="btn btn-success" onClick={() => window.print()}
                    ref={printRRef}>
                    Print Recipe Invoice
                </button>
            </div>
        </div>
    );
};

export default RecipeInvoice;
