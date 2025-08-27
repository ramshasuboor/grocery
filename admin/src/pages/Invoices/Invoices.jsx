import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";

const Invoice = () => {

  const navigate = useNavigate();

  const handleShowInvoice = (invoice) => {
    navigate(`/show-invoice/${invoice._id}`);
  };
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [pagination, setPagination] = useState({
    total: 0,
    limit: 10,
    page: 1,
    pages: 0,
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: null,
    prevPage: null,
  });

  useEffect(() => {
    fetchInvoices(currentPage, limit, searchTerm);
  }, [currentPage, limit, searchTerm]);



const fetchInvoices = async (page = 1, limit = 10, search = "") => {
  try {
    const response = await fetch(
      `http://localhost:4000/api/v1/invoice/all?page=${page}&limit=${limit}&search=${search}`,
      {
        method: "GET",
      }
    )
      const result = await response.json();
    console.log("Invoice API Response:", result);

    // Agar sirf data array aata hai
    setInvoices(result.data || []);

    // Pagination dummy set kar do (tab tak jab tak backend support add na ho)
    // setPagination({
    //   total: result.data?.length || 0,
    //   limit: limit,
    //   page: page,
    //   pages: 1,
    //   hasNextPage: false,
    //   hasPrevPage: false,
    //   nextPage: null,
    //   prevPage: null,
    // });


   setPagination(result.pagination || {});
  //  setTotalPages(result.pagination?.pages || 1);

    setTotalPages(1);
    setLoading(false);
  } catch (error) {
    console.error("Error fetching invoices", error);
    setError("Failed to fetch invoices");
    setLoading(false);
  }
};

  // Delete invoice
  const deleteInvoice = async (invoiceId) => {
    if (!window.confirm("Are you sure you want to delete this invoice?")) {
      return;
    }
    try {
     const response = await fetch(
      `http://localhost:4000/api/v1/invoice/delete/${invoiceId}`,
      {
        method: "DELETE",
      }
    );
    const result = await response.json()
      if (result.success) {
        console.log("Invoice deleted.");
        fetchInvoices();
      }
    } catch (error) {
      console.error("Error deleting invoice", error);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchInvoices(1, limit, searchTerm);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1);
  };

  return (
    <main>
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header card-title">
              <div className="d-flex align-items-center">
                <h3 className="mb-0">List of All Invoices</h3>
                <div className="ml-auto">
                  <Link to="/invoice" className="btn btn-success">
                    <i className="fa fa-plus-circle"></i> Add New
                  </Link>
                </div>
              </div>
            </div>

            <div className="card-body">
              {/* Search bar */}
              <div className="mb-3">
                <form onSubmit={handleSearch} className="row g-3">
                  <div className="col-auto flex-grow-1">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search invoices..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="col-auto">
                    <button type="submit" className="btn btn-primary">
                      Search
                    </button>
                  </div>
                </form>
              </div>

              {loading && invoices.length === 0 ? (
                <div className="text-center">Loading invoices...</div>
              ) : error ? (
                <div className="alert alert-danger">{error}</div>
              ) : (
                <>
                  <table className="table table-striped table-hover">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Invoice No</th>
                        <th>Customer</th>
                        {/* <th>Date</th> */}
                        <th>Total</th>
                        <th>Paid</th>
                        <th>Balance</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="text-center">
                            No invoice found
                          </td>
                        </tr>
                      ) : (
                        invoices.map((invoice, index) => (
                          <tr key={invoice._id}>
                            <td>{(currentPage - 1) * limit + index + 1}</td>
                            <td>{invoice.invoiceNo}</td>
                            <td>{invoice.customerName}</td>
                            {/* <td>{invoice.date}</td> */}
                            <td>{invoice.totals?.grossTotal}</td>
                            <td>{invoice.paidAmount}</td>
                            <td>{invoice.balanceAmount}</td>
                            <td width="150">
                              <Link
                                to={`/show-invoice/${invoice._id}`}
                                onClick={(e) => {
                                  e.preventDefault()
                                  handleShowInvoice(invoice)}}
                                className="btn btn-sm btn-circle btn-outline-info mr-1"
                                title="Show"
                              >
                                <i className="fa fa-eye"></i>
                              </Link>
                              <Link
                                to={`/edit-invoice/${invoice._id}`}
                                className="btn btn-sm btn-circle btn-outline-secondary mr-1"
                                title="Edit"
                              >
                                <i className="fa fa-edit"></i>
                              </Link>
                              <a
                                href="#"
                                className="btn btn-sm btn-circle btn-outline-danger"
                                title="Delete"
                                onClick={(e) => {
                                  e.preventDefault();
                                  deleteInvoice(invoice._id);
                                }}
                              >
                                <i className="fa fa-times"></i>
                              </a>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <select
                        className="form-select"
                        value={limit}
                        onChange={handleLimitChange}
                      >
                        <option value="5">5 per page</option>
                        <option value="10">10 per page</option>
                        <option value="25">25 per page</option>
                        <option value="50">50 per page</option>
                      </select>
                    </div>

                    <div>
                      Showing{" "}
                      {invoices.length > 0
                        ? (currentPage - 1) * limit + 1
                        : 0}{" "}
                      to {(currentPage - 1) * limit + invoices.length} of{" "}
                      {pagination.total} invoices
                    </div>
                    <nav aria-label="Page navigation">
                      <ul className="pagination justify-content-end mt-3">
                        <li
                          className={`page-item ${
                            !pagination.hasPrevPage ? "disabled" : ""
                          }`}
                        >
                          <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.hasPrevPage)
                                handlePageChange(pagination.prevPage);
                            }}
                          >
                            Previous
                          </a>
                        </li>

                        {Array.from(
                          { length: pagination.pages },
                          (_, i) => i + 1
                        ).map((page) => (
                          <li
                            key={page}
                            className={`page-item ${
                              page === currentPage ? "active" : ""
                            }`}
                          >
                            <a
                              className="page-link"
                              href="#"
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </a>
                          </li>
                        ))}

                        <li
                          className={`page-item ${
                            !pagination.hasNextPage ? "disabled" : ""
                          }`}
                        >
                          <a
                            className="page-link"
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              if (pagination.hasNextPage)
                                handlePageChange(pagination.nextPage);
                            }}
                          >
                            Next
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Invoice;
