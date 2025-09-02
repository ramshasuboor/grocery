

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const EditInvoice = () => {
    const [invoice, setInvoice] = useState(null);
    const [data, setData] = useState({
        customer: "",
        invoiceNo: "",
        date: "",
        rows: [],
        totals: {
            totalAmount: 0,
            totalDiscount: 0,
            grossTotal: 0,
        },
        paidAmount: "",
        balanceAmount: "",
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                setLoading(true);
                const response = await axios.get(
                    `http://localhost:4000/api/v1/invoice/${id}`
                );
                console.log("Invoice API Response:", response.data);

                const invoice = response?.data?.data;
                if (!invoice) {
                    setError("Invoice not found in API response");
                    return;
                }

                setInvoice(invoice);

                setData({
                    customer: invoice.customer?._id || "",
                    invoiceNo: invoice.invoiceNo || "",
                    date: invoice.date ? new Date(invoice.date).toISOString().slice(0, 10) : "",
                    // rows: invoice.rows.map(r => ({
                    //     ...r,
                    //     product: typeof r.product === "object" ? r.product._id : r.product,
                    //     productName: typeof r.product === "object" ? r.product.name : "", // UI dikhane ke liye
                    // })),
                    // rows: invoice.rows.map(r => ({
                    //     ...r,
                    //     product: r.product && typeof r.product === "object" ? r.product._id : (r.product || ""),
                    //     productName: r.product && typeof r.product === "object" ? r.product.name : "",
                    // })),
                    rows: invoice.rows.map(r => ({
  ...r,
  product: r.product && typeof r.product === "object"
    ? { value: r.product._id, label: r.product.name }   // react-select ka object
    : r.product,  // fallback agar sirf id ho
})),


                    totals: {
                        totalAmount: invoice?.totals?.totalAmount || 0,
                        totalDiscount: invoice?.totals?.totalDiscount || 0,
                        grossTotal: invoice?.totals?.grossTotal || 0,
                    },
                    paidAmount: invoice.paidAmount || "",
                    balanceAmount: invoice.balanceAmount || "",
                });
            } catch (error) {
                console.error("Error fetching invoice details:", error);
                setError("Error fetching invoice details");
            } finally {
                setLoading(false);
            }
        };

        fetchInvoice();
    }, [id]);


    // ✅ Rows me change hote hi totals calculate karna
    useEffect(() => {
        if (data.rows?.length > 0) {
            const totalAmount = data.rows.reduce(
                (acc, row) => acc + (Number(row.quantity) * Number(row.mrp) || 0),
                0
            );

            const totalDiscount = data.rows.reduce(
                (acc, row) => acc + (Number(row.discount) || 0),
                0
            );

            const grossTotal = totalAmount - totalDiscount;

            setData((prev) => ({
                ...prev,
                totals: { totalAmount, totalDiscount, grossTotal },
            }));
        }
    }, [data.rows]);

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((data) => ({ ...data, [name]: value }));
    };

    const onRowChange = (index, field, value) => {
        const updatedRows = [...data.rows];
        updatedRows[index][field] = value;
        setData((prev) => ({ ...prev, rows: updatedRows }));
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            const payload = {
                customer: data.customer,
                invoiceNo: data.invoiceNo,
                date: data.date,
                rows: data.rows,
                totals: data.totals,
                paidAmount: data.paidAmount,
                balanceAmount: data.balanceAmount,
            };

            const response = await axios.patch(
                `http://localhost:4000/api/v1/invoice/update/${id}`,
                payload,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (response.data.success) {
                navigate("/invoice");
            } else {
                setError(response.data.message || "Failed to update invoice");
            }
        } catch (error) {
            console.error("Error updating invoice:", error);
            setError("Failed to update invoice");
        }
    };

    if (loading) {
        return <div className="loading">Loading invoice data...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    return (
        <main className="py-5">
            <div className="container">
                <div className="row justify-content-md-center">
                    <div className="col-md-10">
                        <div className="card">
                            <div className="card-header card-title">
                                <h2>Edit Invoice #{data.invoiceNo}</h2>
                            </div>
                            <form onSubmit={onSubmitHandler}>
                                <div className="card-body">
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Invoice No</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                name="invoiceNo"
                                                value={data.invoiceNo}
                                                className="form-control"
                                                disabled
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Date</label>
                                        <div className="col-md-9">
                                            <input
                                                type="date"
                                                name="date"
                                                value={data.date ? data.date.slice(0, 10) : ""}
                                                onChange={onChangeHandler}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    {/* Rows Section */}
                                    <h5>Items</h5>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Product</th>
                                                <th>Qty</th>
                                                <th>Rate</th>
                                                <th>Total</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {data.rows?.map((row, idx) => (
                                                <tr key={idx}>
                                                    <td>
                                                        <input
                                                            type="text"
                                                            value={row.productName || ""}
                                                            onChange={(e) =>
                                                                onRowChange(idx, "productName", e.target.value)
                                                            }
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={row.quantity || ""}
                                                            onChange={(e) =>
                                                                onRowChange(idx, "quantity", Number(e.target.value))
                                                            }
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={row.mrp || ""}
                                                            onChange={(e) =>
                                                                onRowChange(idx, "mrp", Number(e.target.value))
                                                            }
                                                            className="form-control"
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="number"
                                                            value={row.total || ""}
                                                            onChange={(e) =>
                                                                onRowChange(idx, "total", Number(e.target.value))
                                                            }
                                                            className="form-control"
                                                        />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>

                                    {/* Totals */}
                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Subtotal</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                value={data.totals.totalAmount}
                                                disabled
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Discount</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                value={data.totals.totalDiscount}
                                                disabled
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Gross Total</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                value={data.totals.grossTotal}
                                                disabled
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Paid Amount</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                name="paidAmount"
                                                value={data.paidAmount}
                                                onChange={onChangeHandler}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group row">
                                        <label className="col-md-3 col-form-label">Balance Amount</label>
                                        <div className="col-md-9">
                                            <input
                                                type="text"
                                                name="balanceAmount"
                                                value={data.balanceAmount}
                                                onChange={onChangeHandler}
                                                className="form-control"
                                            />
                                        </div>
                                    </div>

                                    <hr />
                                    <div className="form-group row mb-0">
                                        <div className="col-md-9 offset-md-3">
                                            <button type="submit" className="btn btn-primary">
                                                Save
                                            </button>
                                            <Link
                                                to={"/invoice"}
                                                className="btn btn-outline-secondary"
                                            >
                                                Cancel
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default EditInvoice;
