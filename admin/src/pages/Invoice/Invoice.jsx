import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from "react-router-dom";
// import axios from 'axios';
import "./Invoice.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
const Invoice = () => {
    const navigate = useNavigate();
    const [invoiceNo, setInvoiceNo] = useState("");
    const [isRowAdded, setIsRowAdded] = useState(false);
    const [rows, setRows] = useState([
        { product: "", avgQty: "", quantity: "", mrp: "", discount: "", total: "", unit: "" }
    ]);

    const handleAddRow = () => {
        setRows([
            ...rows,
            { product: "", avgQty: "", quantity: "", mrp: "", discount: "", total: "", unit: "" }

        ]);
        setIsRowAdded(true)
        setTimeout(() => {
            if (productRef.current) {
                productRef.current.focus()
            }
        }, 0)
    };

    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState("");

    const [items, setItems] = useState([]);


    const [totals, setTotals] = useState({
        totalAmount: 0,
        totalDiscount: 0,
        grossTotal: 0,
    });

    const [paidAmount, setPaidAmount] = useState("");
    const [balanceAmount, setBalanceAmount] = useState(0);

    // const [invoiceNo, setInvoiceNo] = useState(0);
    // const [counter, setCounter] = useState(0); // counter store karega

    const handlePaidChange = (e) => {
        const value = e.target.value;

        // Agar user input khali kare to empty string hi rakho
        if (value === "") {
            setPaidAmount("");
            return;
        }

        const paid = parseFloat(value) || 0;
        setPaidAmount(paid);
    };


    useEffect(() => {
        const grossTotal = parseFloat(totals.grossTotal) || 0;
        const paid = parseFloat(paidAmount) || 0;
        const balance = grossTotal - paid;
        setBalanceAmount(Number(balance.toFixed(2)));
    }, [totals.grossTotal, paidAmount]);
    // fecth all customer from database

    useEffect(() => {
        fetch("http://localhost:4000/api/v1/product/all")
            .then((res) => res.json())
            .then((data) => {
                setItems(data.data)
                console.log("items", data)
            })
            .catch((err) => console.error(err));
    }, []);


    useEffect(() => {
        fetch("http://localhost:4000/api/v1/customer/all")
            .then((res) => res.json())
            .then((data) => {
                setCustomers(data.data)
                console.log("customers", data)
            })
            .catch((err) => console.error(err));
    }, []);

    const handleCustomerSelect = (e) => {
        const customerId = e.target.value;

        if (customerId === "cash") {
            setSelectedCustomer("cash");
        } else {
            const customer = customers.find((c) => c._id === customerId);
            setSelectedCustomer(customer || "");
        }
    };

    const handlePrintClick = () => {

        const rowsWithNames = rows.map((row) => {
            const product = items.find((item) => item._id === row.product);
            return {
                ...row,
                product: product ? product.name : row.product, // replace _id with name
            };
        });
        navigate("/print-invoice", {
            state: {
                customer: selectedCustomer,
                rows: rowsWithNames,
                totals: totals,
                paidAmount: paidAmount,
                balanceAmount: balanceAmount,
                invoiceNo: invoiceNo,
                date: new Date().toLocaleDateString(),
            },
        });
    };

    const handleChange = (index, field, value) => {
        const updatedRows = [...rows];
        updatedRows[index][field] = value;

        // Product select hua
        if (field === "product") {
            const selected = items.find((item) => item._id === value);
            if (selected) {
                updatedRows[index].product = selected._id;
                updatedRows[index].avgQty = selected.opening_stock || 0;
                updatedRows[index].mrp = selected.price || 0;
                updatedRows[index].quantity = 1; // default 1 qty
                updatedRows[index].discount = 0;
                updatedRows[index].unit = selected.unit;  // ✅ Yaha unit assign karenge
            }
        }

        const qty = parseFloat(updatedRows[index].quantity) || 0;
        const price = parseFloat(updatedRows[index].mrp) || 0;
        const discount = parseFloat(updatedRows[index].discount) || 0;
        let subtotal = 0;
        let discountAmount = 0;
        let finalTotal = 0;

        if (field === "total") {
            // Agar user total enter kare → quantity auto niklegi
            const enteredTotal = parseFloat(value) || 0;
            const qtyFromTotal = price > 0 ? (enteredTotal / price) : 0;
            updatedRows[index].quantity = qtyFromTotal.toFixed(2); // 2 decimal tak
            subtotal = qtyFromTotal * price;
            discountAmount = (subtotal * discount) / 100;
            finalTotal = subtotal - discountAmount;
        } else {
            // Normal calculation (qty se total niklega)
            subtotal = qty * price;
            discountAmount = (subtotal * discount) / 100;
            finalTotal = subtotal - discountAmount;
        }

        updatedRows[index].subtotal = subtotal;
        updatedRows[index].discountAmount = discountAmount;
        updatedRows[index].total = finalTotal;

        setRows(updatedRows);
    };





    const calculateTotals = () => {
        let totalAmount = 0;
        let totalDiscount = 0;
        let grossTotal = 0;

        rows.forEach((row) => {
            totalAmount += row.subtotal || 0;
            totalDiscount += row.discountAmount || 0;
            grossTotal += row.total || 0;
        });


        setTotals({
            totalAmount: Math.round(totalAmount),
            totalDiscount: (totalDiscount.toFixed(2)),
            grossTotal: Math.round(grossTotal),
        })
    };

    useEffect(() => {
        calculateTotals();
    }, [rows]);

    const customerRef = useRef([null]);
    const paymentTypeRef = useRef([null]);
    const productRef = useRef([]);
    const qtyRef = useRef([]);
    // const discountRef = useRef([]);
    const paidRef = useRef(null);
    const addBtnRef = useRef([]);
    const deleteBtnRef = useRef([]);
    const totalRef = useRef([]);



    const handleKeyDown = (e, nextRef, index, prevRef) => {
        if (e.key === "Enter") {
            e.preventDefault();

            if (e.shiftKey) {
                // 🔙 Shift + Enter → Previous
                if (Array.isArray(prevRef?.current)) {
                    if (prevRef.current[index]) {
                        prevRef.current[index].focus();
                    }
                } else if (prevRef?.current) {
                    prevRef.current.focus();
                }
                return;
            }

            // 🔜 Normal Enter → Next
            if (Array.isArray(nextRef?.current)) {
                if (nextRef.current[index]) {
                    nextRef.current[index].focus();
                }
            } else if (nextRef?.current) {
                nextRef.current.focus();
            }
        }
    };



    useEffect(() => {
        if (isRowAdded && rows.length > 0) {
            const lastIndex = rows.length - 1;
            productRef.current[lastIndex]?.focus();
            setIsRowAdded(false); // reset flag
        }
    }, [rows, isRowAdded]);

    // Page Load pe sirf Customer par focus
    useEffect(() => {
        if (customerRef.current) {
            customerRef.current.focus();
        }
    }, []);
    const handleDeleteRow = (index) => {
        const newRows = [...rows];
        newRows.splice(index, 1);
        setRows(newRows);

        setTimeout(() => {
            if (newRows.length > 0) {
                // Agar next row exist karti hai
                if (productRef.current[index]) {
                    productRef.current[index].focus();
                }
                // Agar delete last row tha → pichhli row pe focus
                else if (productRef.current[index - 1]) {
                    productRef.current[index - 1].focus();
                }
            }
        }, 0);
    };
    useEffect(() => {
        const handleKeyPress = (e) => {
            // Agar user '+' press kare
            if (e.key === "+" || e.key === "=") {
                // '=' isliye, kyunki keyboard pe '+' Shift + '=' hota hai
                e.preventDefault();
                handleAddRow();
            }
            // Agar user '-' press kare → Delete Last Row
            if (e.key === "-") {
                e.preventDefault();
                if (rows.length > 0) {
                    handleDeleteRow(rows.length - 1); // last row delete hogi
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);

        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [rows]);

    const handleSaveAndPrint = async () => {
        console.log("✅ handleSaveAndPrint function called");
        try {
            console.log("rows =>", rows);
            const invoiceData = {
                customer: selectedCustomer === "cash" ? "Cash" : selectedCustomer._id,
                customerName: selectedCustomer === "cash" ? "Cash Sale" : selectedCustomer.name,
                rows: rows.map(r => ({
                    product: r.product,
                    // product: items.find(i => i._id === r.product)?.name || r.product,
                    quantity: r.quantity,
                    mrp: r.mrp,
                    discount: r.discount,
                    total: r.total,
                    // unit: r.unit || "pcs", 
                    unit: items.find(i => i._id === r.product)?.unit || r.unit, // string
                })),
                totals: totals,
                paidAmount: paidAmount,
                balanceAmount: balanceAmount,
                invoiceNo: invoiceInfo,
                date: new Date().toLocaleDateString(),
            };

            console.log("Invoice Data =>", invoiceData);
            const response = await fetch("http://localhost:4000/api/v1/invoice/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(invoiceData),
            });

            const result = await response.json();

            if (result.success) {
                // ✅ Pehle save ho gaya
                alert("Invoice saved successfully!");

                // ✅ Ab print page pe navigate karo
                handlePrintClick();
            } else {
                alert("Failed to save invoice: " + result.error);
            }
        } catch (err) {
            console.error("Error saving invoice:", err);
            alert("Something went wrong!");
        }
    };

    // useEffect(() => {
    //     const fetchInvoiceNo = async () => {
    //         try {
    //             const res = await fetch("http://localhost:4000/api/v1/invoice/nextNo");
    //             const data = await res.json();
    //             console.log(data, "invioce")
    //             if (data.success) {
    //                 setInvoiceNo((data.nextInvoiceNo)); // ensure backend JSON is { success: true, nextInvoiceNo: ... }
    //             } else {
    //                 console.error("Failed to get next invoice no:", data.error);
    //             }
    //         } catch (err) {
    //             console.error("Error fetching invoice no:", err);
    //         }
    //     };
    //     fetchInvoiceNo();
    // }, []);



    const [invoiceInfo, setInvoiceInfo] = useState("");

    useEffect(() => {
        // Page load pe automatic generate karenge
        const now = new Date();

        // Generate invoice number based on timestamp (example: YYYYMMDDHHMMSS)
        const invoiceNo = `INV-${now.getFullYear()}${(now.getMonth() + 1)
            .toString().padStart(2, '0')}${now.getDate().toString().padStart(2, '0')}${now.getHours().toString().padStart(2, '0')}${now.getMinutes().toString().padStart(2, '0')}${now.getSeconds().toString().padStart(2, '0')}`;

        setInvoiceInfo(`${invoiceNo} `);
    }, []);


    return (
        <>
            <h3>Add New Sale</h3>
            <form className="add-new-sale mt-3" action="">
                <div className="form-row">
                    <div className="col-md">
                        <label className="form-label">Customer Name:</label>
                        <select
                            name="customerName"
                            ref={customerRef}
                            onKeyDown={(e) => handleKeyDown(e, paymentTypeRef)}
                            className="form-control"
                            value={ selectedCustomer?._id }
                            onChange={handleCustomerSelect}
                            placeholder="Customer Name"
                            required
                        >
                            {/* ✅ Placeholder option (disable + hidden) */}
                            <option value="" disabled hidden>
                                Select Customer
                            </option>

                            {/* ✅ Cash Sale option fix */}
                            <option value="cash">Cash Sale</option>

                            {customers.map((customer) => (
                                <option key={customer._id} value={customer._id}>
                                    {customer.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md">
                        <label className="form-label">Address</label>
                        <input
                            type="text"
                            name="address"
                            value={selectedCustomer?.address || ""}
                            className="form-control"
                            placeholder="Address"
                            required
                        />
                    </div>
                    <div className="col-md">
                        <label className="form-label">Invoice No:</label>
                        <input
                            type="text"
                            name="invoiceNo"
                            value={invoiceInfo}
                            className="form-control"
                            placeholder="INV NO"
                            required
                        />
                    </div>
                    <div className="col-md">
                        <label className="form-label">Payment Type:</label>
                        <select
                            name="paymentType"
                            className="form-control"
                            ref={paymentTypeRef}
                            onKeyDown={(e) => handleKeyDown(e, productRef, 0, customerRef)}
                            required
                        >
                            <option value="Cash Payment">Cash Payment</option>
                            <option value="Credit Payment">Credit Payment</option>

                        </select>
                    </div>
                    <div className="col-md">
                        <label className="form-label">Date:</label>
                        <input
                            type="text"
                            name="date"
                            value={new Date().toLocaleDateString("en-GB")}
                            className="form-control"
                            required
                        />
                    </div>
                </div>
                <div className="form-row mt-4 align-items-end mb-5">
                    <div className="col-md-auto mt-4">
                        <button className='btn btn-success'>Add Customer</button>
                    </div>
                    <div className="col-md mt-1 contact-input">
                        <label className="form-label">Contact Number:</label>
                        <input
                            type="text"
                            name="mobile"
                            value={selectedCustomer?.mobile || ""}
                            className="form-control contact-field"
                            placeholder="Contact Number"
                            required
                        />
                    </div>
                </div>
            </form>

            <table className='product-table mt-4 p-3'>
                <thead className='mt-5'>
                    <tr className='table-heading'>
                        <th>Product Name</th>
                        <th>AVG-QTY</th>
                        <th>Quantity</th>
                        <th>MRP</th>
                        <th>Unit</th>
                        {/* <th>Discount%</th> */}
                        <th>Total</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <select
                                    name="select"
                                    data-index={index}
                                    onChange={(e) => {
                                        handleChange(index, "product", e.target.value);
                                    }}
                                    value={row.product}
                                    className="form-control select"
                                    ref={(el) => (productRef.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(e, qtyRef, index, paymentTypeRef)}
                                    required
                                >
                                    <option value="">Select Products:</option>
                                    {items.map((item) => (
                                        <option key={item._id} value={item._id}>
                                            {item.name}
                                        </option>
                                    ))}

                                </select>
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.avgQty}
                                    name="avgQty"
                                    className="form-control input"
                                    placeholder="AVG-QTY"
                                    required
                                    readOnly
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.quantity}
                                    onChange={(e) =>
                                        handleChange(index, "quantity", e.target.value)
                                    }
                                    name="quantity"
                                    className="form-control input"
                                    placeholder="Quantity"
                                    data-index={index}
                                    ref={(el) => (qtyRef.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(e, totalRef, index, productRef)}
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="number"
                                    value={row.mrp}
                                    name="mrp"
                                    className="form-control input"
                                    placeholder="MRP"
                                    readOnly
                                    required
                                />
                            </td>
                            <td>
                                <input
                                    type="text"
                                    value={row.unit}
                                    name="unit"
                                    className="form-control input"
                                    placeholder="Kg/Gm"
                                    readOnly
                                    required
                                />
                            </td>
                            {/* <td>
                                <input
                                    type="number"
                                    value={row.discount}
                                    onChange={(e) =>
                                        handleChange(index, "discount", e.target.value)
                                    }
                                    name="discount"
                                    className="form-control input"
                                    placeholder="Discount"
                                    data-index={index}
                                    ref={(el) => (discountRef.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(e, addBtnRef, index, qtyRef)}
                                    required
                                />
                            </td> */}
                            <td>
                                <input
                                    type="number"
                                    value={row.total}
                                    name="total"
                                    ref={(el) => (totalRef.current[index] = el)}
                                    onKeyDown={(e) => handleKeyDown(e, addBtnRef, index, qtyRef)}
                                    className="form-control input"
                                    placeholder="Total"
                                    onChange={(e) => handleChange(index, "total", e.target.value)}

                                    required
                                />
                            </td>
                            <td>
                                <div className="m-auto d-flex justify-content-center">
                                    <button
                                        type="button"
                                        className='add-btn'
                                        ref={(el) => (addBtnRef.current[index] = el)}
                                        onKeyDown={(e) => handleKeyDown(e, deleteBtnRef, index, totalRef)}
                                        onClick={handleAddRow}>
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                    <button
                                        type="button" className='delete-btn'
                                        ref={(el) => (deleteBtnRef.current[index] = el)}
                                        onKeyDown={(e) => handleKeyDown(e, paidRef, index, paidRef)}
                                        onClick={() => handleDeleteRow(index)}>
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <div className="total-section mt-5">
                <div className="total-first-row mt-2">
                    <div className="total-item">
                        <h6>Opening Balance:</h6>

                        <input type="number" name="opening_balance" id="opening_balance" readOnly />
                    </div>
                    <div className="total-item">
                        <h6>Total Amount:</h6>
                        <input type="number" value={totals.totalAmount} name="total_amount" id="total_amount" readOnly />
                    </div>
                    {/* <div className="total-item">
                        <h6>Total Discount:</h6>
                        <input type="number" value={totals.totalDiscount} name="total_discount" id="total_discount" readOnly />
                    </div> */}
                    <div className="total-item">
                        <h6>Gross Total:</h6>
                        <input type="number" value={totals.grossTotal} name="gross_total" id="gross_total" readOnly />
                    </div>
                    <div className="total-item">
                        <h6>Amount Paid:</h6>
                        <input type="number" className='no-spinner' ref={paidRef}
                            onKeyDown={(e) => handleKeyDown(e, customerRef, deleteBtnRef)} step={0.01} value={paidAmount} onChange={handlePaidChange} name="paid_amount" id="paid_amount" />
                    </div>
                    <div className="total-item">
                        <h6>Balance Amount:</h6>
                        <input type="number" value={balanceAmount || 0} name="balance_amount" id="balance_amount" readOnly />
                    </div>
                </div>
                {/* <div className="total-second-row mt-3">
                    <div className="total-item">
                        <h6>Amount Paid:</h6>
                        <input type="number" className='no-spinner' ref={paidRef}
                            onKeyDown={(e) => handleKeyDown(e, customerRef, deleteBtnRef)} step={0.01} value={paidAmount} onChange={handlePaidChange} name="paid_amount" id="paid_amount" />
                    </div>
                    <div className="total-item">
                        <h6>Balance Amount:</h6>
                        <input type="number" value={balanceAmount || 0} name="balance_amount" id="balance_amount" readOnly />
                    </div>
                </div> */}
            </div>
            <div className="button d-flex flex-column mt-5 mb-5">
                {/* <button className='btn btn-success mb-4 align-self-start' onClick={handleSave}>Save</button> */}
                <button className='btn btn-success align-self-start 
                'onClick={() => {
                        console.log("🟢 Button Clicked");  // yeh hamesha aana chahiye
                        handleSaveAndPrint();
                    }} type='button'>Print Invoice</button>
            </div>

        </>
    )
}

export default Invoice

