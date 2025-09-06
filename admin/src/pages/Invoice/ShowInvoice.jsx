

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./PrintInvoice.css";

// const ShowInvoice = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/v1/invoice/${id}`);
//         setInvoice(res.data.data); // DB se fetch hua original invoice
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//       }
//     };
//     fetchInvoice();
//   }, [id]);

//   if (!invoice) return <h3>Loading...</h3>;

//   const { customer, rows, totals, paidAmount, balanceAmount, invoiceNo, date, openingBalance, closingBalance } = invoice;

//   return (
//     <div className="invoice-container">
//       <div className="invoice-header">
//         <div className="company-name">AWS Stores</div>
//         <div className="company-details">
//           <div>Mobile-No: 9922554433</div>
//           <div>Address: Galib Road Warispura Kamptee.</div>
//         </div>
//       </div>

//       <div className="invoice-details">
//         <div className="billing-section">
//           <div className="section-title">Bill To</div>
//           <div className="client-details">
//             <div>{customer?.name || invoice.customerName}</div>
//             <div>{customer?.address}</div>
//             <div>{customer?.mobile}</div>
//           </div>
//         </div>

//         <div className="date-section">
//           <div>
//             <span className="date-label">Invoice No#:</span> {invoiceNo}
//           </div>
//           <div className="mt-2">
//             <span className="date-label">Date:</span>{" "}
//             {date ? new Date(date).toLocaleDateString("en-GB") : ""}
//           </div>
//         </div>
//       </div>

//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>सामान का विवरण</th>
//             <th>मात्रा</th>
//             <th>इकाई</th>
//             <th>प्रति दर</th>
//             <th>कुल</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows?.map((row, index) => (
//             <tr key={index}>
//               <td>{row.product?.name}</td>
//               <td>{row.quantity}</td>
//               <td>{row.unit}</td>
//               <td>{row.mrp}</td>
//               <td>{row.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="balance-details">
//         <div>Subtotal</div>
//         <div>₹ {totals?.totalAmount}</div>
//       </div>
//       {/* <div className="balance-details">
//         <div>Opening Balance</div>
//         <div>₹ {openingBalance}</div>
//       </div>
//       <div className="balance-details">
//         <div>Grand Total</div>
//         <div>₹ {totals?.totalAmount + (openingBalance || 0)}</div> {/* optional, ya DB se bhi fetch kar sakte ho agar store kiya hai */}
//       {/* </div>
//       <div className="balance-details">
//         <div>Paid Amount</div>
//         <div>₹ {paidAmount || 0}</div>
//       </div>
//       <div className="balance-details">
//         <div>Balance</div>
//         <div>₹ {balanceAmount}</div>
//       </div>
//       <div className="balance-details">
//         <div>Closing Balance</div>
//         <div>₹ {invoice.closingBalance}</div>
//       </div> */}
//       <div className="balance-details">
//   <div>Opening Balance</div>
//   <div>₹ {invoice.openingBalance}</div>
// </div>

// <div className="balance-details">
//   <div>Grand Total</div>
//   <div>₹ {invoice.openingBalance + invoice.totals.totalAmount}</div>
// </div>

// <div className="balance-details">
//   <div>Paid Amount</div>
//   <div>₹ {invoice.paidAmount || 0}</div>
// </div>

// <div className="balance-details">
//   <div>Closing Balance</div>
//   <div>₹ {invoice.closingBalance}</div>
// </div>


//       <div className="print-button-container">
//         <button className="btn btn-success" onClick={() => window.print()}>
//           Print Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShowInvoice;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import "./PrintInvoice.css";

// const ShowInvoice = () => {
//   const { id } = useParams();
//   const [invoice, setInvoice] = useState(null);

//   useEffect(() => {
//     const fetchInvoice = async () => {
//       try {
//         const res = await axios.get(`http://localhost:4000/api/v1/invoice/${id}`);
//         setInvoice(res.data.data);
//         console.log(invoice,"invoice") // DB se fetch hua original invoice
//       } catch (error) {
//         console.error("Error fetching invoice:", error);
//       }
//     };
//     fetchInvoice();
//   }, [id]);

//   if (!invoice) return <h3>Loading...</h3>;

//   const { customer, rows, totals, paidAmount, invoiceNo, date } = invoice;

//   // ✅ Calculate Opening & Closing Balance
//   const openingBalance = customer?.closing_balance ?? invoice.openingBalance ?? 0;
//   const grossTotal = totals?.totalAmount ?? 0;
//   const paid = paidAmount || 0;
//   const closingBalance = openingBalance + grossTotal - paid;

//   return (
//     <div className="invoice-container">
//       <div className="invoice-header">
//         <div className="company-name">AWS Stores</div>
//         <div className="company-details">
//           <div>Mobile-No: 9922554433</div>
//           <div>Address: Galib Road Warispura Kamptee.</div>
//         </div>
//       </div>

//       <div className="invoice-details">
//         <div className="billing-section">
//           <div className="section-title">Bill To</div>
//           <div className="client-details">
//             <div>{customer?.name || invoice.customerName}</div>
//             <div>{customer?.address}</div>
//             <div>{customer?.mobile}</div>
//           </div>
//         </div>

//         <div className="date-section">
//           <div>
//             <span className="date-label">Invoice No#:</span> {invoiceNo}
//           </div>
//           <div className="mt-2">
//             <span className="date-label">Date:</span>{" "}
//             {date ? new Date(date).toLocaleDateString("en-GB") : ""}
//           </div>
//         </div>
//       </div>

//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>सामान का विवरण</th>
//             <th>मात्रा</th>
//             <th>इकाई</th>
//             <th>प्रति दर</th>
//             <th>कुल</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows?.map((row, index) => (
//             <tr key={index}>
//               <td>{row.product?.name}</td>
//               <td>{row.quantity}</td>
//               <td>{row.unit}</td>
//               <td>{row.mrp}</td>
//               <td>{row.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="balance-details">
//         <div>Opening Balance</div>
//         <div>₹ {openingBalance}</div>
//       </div>

//       <div className="balance-details">
//         <div>Gross Total</div>
//         <div>₹ {grossTotal}</div>
//       </div>

//       <div className="balance-details">
//         <div>Paid Amount</div>
//         <div>₹ {paid}</div>
//       </div>

//       <div className="balance-details">
//         <div>Closing Balance</div>
//         <div>₹ {closingBalance}</div>
//       </div>

//       <div className="print-button-container">
//         <button className="btn btn-success" onClick={() => window.print()}>
//           Print Invoice
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ShowInvoice;


// import React from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./PrintInvoice.css"; // PrintInvoice CSS ka thoda modified version

// const ShowInvoice = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const {
//     customer,
//     customerName,
//     rows,
//     totals,
//     paidAmount,
//     balanceAmount,
//     invoiceNo,
//     date,
//     openingBalance,
//     closingBalance,
//   } = location.state || {};

//   const subtotal = totals?.totalAmount || 0;
// const grandTotal = subtotal + (openingBalance || 0);
// const balance = grandTotal - (paidAmount || 0);
// const closing = balance; // same as balance

//   if (!location.state) {
//     return (
//       <div className="no-invoice">
//         <h3>No invoice data found!</h3>
//         <button className="btn btn-primary" onClick={() => navigate(-1)}>
//           Go Back
//         </button>
//       </div>
//     );
//   }

//   return (
//     <div className="invoice-container">
//       <div className="invoice-header">
//         <div className="company-name">AWS Stores</div>
//         <div className="company-details">
//           <div>Mobile-No: 9922554433</div>
//           <div>Address: Galib Road Warispura Kamptee.</div>
//         </div>
//       </div>

//       <div className="invoice-details">
//         <div className="billing-section">
//           <div className="section-title">Bill To</div>
//           <div className="client-details">
//             <div>{customerName || "Cash Sale"}</div>
//             <div>{customer?.address || ""}</div>
//             <div>{customer?.mobile || ""}</div>
//           </div>
//         </div>

//         <div className="date-section">
//           <div>
//             <strong>Invoice No#:</strong> {invoiceNo}
//           </div>
//           <div>
//             <strong>Date:</strong> {date ? new Date(date).toLocaleDateString("en-GB") : ""}
//           </div>
//         </div>
//       </div>

//       <table className="invoice-table">
//         <thead>
//           <tr>
//             <th>सामान का विवरण</th>
//             <th>मात्रा</th>
//             <th>इकाई</th>
//             <th>प्रति दर</th>
//             <th>कुल</th>
//           </tr>
//         </thead>
//         <tbody>
//           {rows?.map((row, index) => (
//             <tr key={index}>
//               <td>{row.product?.name}</td>
//               <td>{row.quantity}</td>
//               <td>{row.unit || "pcs"}</td>
//               <td>₹ {row.mrp}</td>
//               <td>₹ {row.total}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <div className="summary-section">
//         <div className="balance-details">
//           <div>Subtotal</div>
//           <div>₹ {totals?.totalAmount}</div>
//         </div>
//         <div className="balance-details">
//           <div>Opening Balance</div>
//           <div>₹ {openingBalance || 0}</div>
//         </div>
//         <div className="balance-details">
//           <div>Grand Total</div>
//           <div>₹ {(totals?.totalAmount || 0) + (openingBalance || 0)}</div>
//         </div>
//         <div className="balance-details">
//           <div>Paid Amount</div>
//           <div>₹ {paidAmount || 0}</div>
//         </div>
//         <div className="balance-details">
//           <div>Balance</div>
//           <div>₹ {balanceAmount || 0}</div>
//         </div>
//         <div className="balance-details">
//           <div>Closing Balance</div>
//           <div>₹ {closing|| 0}</div>
//         </div>
//       </div>

//       {/* <button className="btn btn-primary mt-3" onClick={() => navigate(-1)}>
//         Back
//       </button> */}
//     </div>
//   );
// };

// export default ShowInvoice;


import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PrintInvoice.css";

const ShowInvoice = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { customer, customerName, rows, totals, paidAmount, balanceAmount, invoiceNo, date } =
    location.state || {};

  // const [openingBalance, setOpeningBalance] = useState(0);
  // const [closingBalance, setClosingBalance] = useState(0);

  // useEffect(() => {
  //   if (customer?._id) {
  //     // Fetch all invoices for this customer
  //     fetch(`http://localhost:4000/api/v1/invoice/customer/${customer._id}`)
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data.success) {
  //           const previousInvoices = data.data.filter(inv => inv._id !== location.state._id);
  //           const prevBalance = previousInvoices.reduce(
  //             (sum, inv) => sum + (inv.balanceAmount || 0),
  //             0
  //           );
  //           setOpeningBalance(prevBalance);
  //           setClosingBalance(prevBalance + (totals?.totalAmount || 0) - (paidAmount || 0));
  //         }
  //       })
  //       .catch(err => console.error(err));
  //   } else {
  //     // Cash sale
  //     setOpeningBalance(0);
  //     setClosingBalance((totals?.totalAmount || 0) - (paidAmount || 0));
  //   }
  // }, [customer, totals, paidAmount, location.state._id]);

  if (!location.state) {
    return (
      <div className="no-invoice">
        <h3>No invoice data found!</h3>
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="invoice-container">
      <div className="invoice-header">
        <div className="company-name">AWS Stores</div>
        <div className="company-details">
          <div>Mobile-No: 9922554433</div>
          <div>Address: Galib Road Warispura Kamptee.</div>
        </div>
      </div>

      <div className="invoice-details">
        <div className="billing-section">
          <div className="section-title">Bill To</div>
          <div className="client-details">
            <div>{customerName || "Cash Sale"}</div>
            <div>{customer?.address || ""}</div>
            <div>{customer?.mobile || ""}</div>
          </div>
        </div>

        <div className="date-section">
          <div>
            <strong>Invoice No#:</strong> {invoiceNo}
          </div>
          <div>
            <strong>Date:</strong> {date ? new Date(date).toLocaleDateString("en-GB") : ""}
          </div>
        </div>
      </div>

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
          {rows?.map((row, index) => (
            <tr key={index}>
              <td>{row.product?.name || row.product}</td>
              <td>{row.quantity}</td>
              <td>{row.unit || "pcs"}</td>
              <td>₹ {row.mrp}</td>
              <td>₹ {row.total}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="balance-section">
        <div className="balance-details">
          <div>Subtotal</div>
          <div>₹ {totals?.totalAmount || 0}</div>
        </div>
        <div className="balance-details">
          <div>Opening Balance</div>
          <div>₹ {customer.openingBalance}</div>
        </div>
        <div className="balance-details">
          <div>Grand Total</div>
          <div>₹ {(totals?.totalAmount || 0) + customer?.openingBalance}</div>
        </div>
        <div className="balance-details">
          <div>Paid Amount</div>
          <div>₹ {paidAmount || 0}</div>
        </div>
        <div className="balance-details">
          <div>Balance</div>
          <div>₹ {balanceAmount || 0}</div>
        </div>
        <div className="balance-details">
          <div>Closing Balance</div>
          <div>₹ {customer?.closingBalance}</div>
        </div>
      </div>

      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => navigate(-1)}>
          Back
        </button>
      </div>
    </div>
  );
};

export default ShowInvoice;
