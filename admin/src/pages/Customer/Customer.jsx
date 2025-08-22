import React, { useEffect, useState, useRef } from "react";
import "./Customer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
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
    fetchCustomers(currentPage, limit, searchTerm);
  }, [currentPage, limit, searchTerm]);

  const fetchCustomers = async (page = 1, limit = 10, search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/customer/all?page=${page}&limit=${limit}&search=${search}`
      );
      setCustomers(response.data.data);
      setPagination(response.data.pagination);
      setTotalPages(response.data.pagination.pages);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching customers", error);
      message.error("Failed to fetch customers");
      setLoading(false);
    }
  };

  const deleteCustomer = async (customerId) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/customer/delete/${customerId}`
      );
      if (response.data.success) {
        console.log("Customer deleted.");
      }
      fetchCustomers();
    } catch (error) {
      console.log("Error deleting customer", error);
      message.error("Failed to delete customer");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchSuppliers(1, limit, searchTerm);
  };

  const handleLimitChange = (e) => {
    const newLimit = parseInt(e.target.value, 10);
    setLimit(newLimit);
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  return (
    <>
      <main className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-title">
                <div className="d-flex align-items-center">
                  <h3 className="mb-0">List of All Customers</h3>
                  <div className="ml-auto">
                    <a href="/add-customer" className="btn btn-success">
                      <i className="fa fa-plus-circle"></i> Add New
                    </a>
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
                        placeholder="Search customers..."
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

                {loading && customers.length === 0 ? (
                  <div className="text-center">Loading customers...</div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Customer Name</th>
                          <th scope="col">Email</th>
                          <th scope="col">Mobile</th>
                          <th scope="col">Company</th>
                          <th scope="col">City</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No customer found
                            </td>
                          </tr>
                        ) : (
                          customers.map((customer, index) => (
                            <tr key={customer._id}>
                              <td>{(currentPage - 1) * limit + index + 1}</td>
                              <td>{customer.name}</td>
                              <td>{customer.email}</td>
                              <td>{customer.mobile}</td>
                              <td>{customer.company}</td>
                              <td>{customer.city}</td>
                              <td width="150">
                                <Link
                                  to={`/show-customer/${customer._id}`}
                                  className="btn btn-sm btn-circle btn-outline-info mr-1"
                                  title="Show"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/edit-customer/${customer._id}`}
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
                                    deleteSupplier(customer._id);
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

                    {/* Pagination controls */}
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
                        {customers.length > 0
                          ? (currentPage - 1) * limit + 1
                          : 0}{" "}
                        to {(currentPage - 1) * limit + customers.length} of{" "}
                        {pagination.total} customers
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

                          {/* Generate page numbers */}
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
    </>
  );
};

export default Customer;
