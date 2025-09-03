import React, { useEffect } from 'react'
import "./PrintInvoice.css"
import { useLocation,useNavigate } from "react-router-dom";

const PrintInvoice = () => {
     const navigate = useNavigate();
    const location = useLocation();
    const { customer,customerName, rows, totals, paidAmount, balanceAmount, invoiceNo, date } =
        location.state || {};


// useEffect(() => {
//   const mediaQueryList = window.matchMedia('print');

//   const handler = (mql) => {
//     if (!mql.matches) {
//       // Jab print dialog close hoga (print ya cancel dono case me)
//       navigate("/invoices", { replace: true });
//     }
//   };

//   mediaQueryList.addEventListener("change", handler);

//   window.print();

//   return () => {
//     mediaQueryList.removeEventListener("change", handler);
//   };
// }, [navigate]);

useEffect(() => {
  let fallbackTimer;

  const handleAfterPrint = () => {
    clearTimeout(fallbackTimer);
    navigate("/invoices", { replace: true });
  };

  // Browser support kare to chalega
  window.onafterprint = handleAfterPrint;

  // Fallback timer (agar onafterprint fire na ho)
  fallbackTimer = setTimeout(() => {
    navigate("/invoices", { replace: true });
  }, 800); // thoda chhota bhi kar sakte ho (500ms)

  // Print dialog open karo
  window.print();

  return () => {
    clearTimeout(fallbackTimer);
    window.onafterprint = null;
  };
}, [navigate]);


    return (
        <>
            <div className="invoice-container">
                <div className="invoice-header">
                    <div className="company-name">
                        AWS Stores
                    </div>
                    <div className="company-details">
                        <div>Mobile-No: 9922554433</div>
                        <div>Address: Galib Road Warispura Kamptee.</div>
                    </div>
                </div>
                <div className="invoice-details">
                    <div className="billing-section">
                        <div className="section-title">Bill To</div>
                        <div className="client-details">
                            <div>{customerName|| "Cash Sale"}</div>
                            <div>{customer?.address || ""}</div>
                            <div>{customer?.mobile || ""}</div>
                        </div>
                    </div>

                    <div className="date-section ">
                        <div className="">
                            <span className="date-label">Invoice No#:</span>
                            {invoiceNo}</div>
                        <div className="mt-2">
                            <span className="date-label">Date:</span>
                            {date ? new Date().toLocaleDateString("en-GB") : ""}
                        </div>
                    </div>
                </div>

                <table className='invoice-table'>
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
                        {rows?.map((row, index) => {
                            return (
                                <tr key={index}>
                                    <td>{row.product}</td>
                                    <td>{row.quantity}</td>
                                    <td>{row.unit || "pcs"}</td>
                                    <td>{row.mrp}</td>
                                    <td>{row.total}</td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
                <div className="summary-section">
                    <div className="summary-row">
                        <div className="summary-label">Subtotal</div>
                        <div className="summary-value">{totals?.totalAmount}</div>
                    </div>
                    {/* <div className="summary-row">
                        <div className="summary-label">Discount</div>
                        <div className="summary-value">{totals?.totalDiscount}</div>
                    </div>
                    <div className="summary-row">
                        <div className="summary-label">Subtotal Less Discount</div>
                        <div className="summary-value">{totals?.grossTotal}</div>
                    </div> */}
                </div>
                <div className="balance-details">
                    <div>Paid Amount ₹</div>
                    <div>{paidAmount}</div>
                </div>
                <div className="balance-details">
                    <div>Balance ₹</div>
                    <div>{balanceAmount}</div>
                </div>
                {/* <div className="greeting">
                    हमारे साथ खरीदारी करने के लिए आप का बहुत बहुत धन्यवाद
                </div>
                <div className="term-section">
                    <div className='term-title '>
                       कृपया काउंटर छोड़ने से पहले हर समय जांच कर लें।
                    </div>
                </div> */}
                {/* <div className="print-button-container">
                    <button className='btn btn-success' onClick={() => window.print()}>Print Invoice</button>
                </div> */}
            </div>
        </>
    )
}

export default PrintInvoice