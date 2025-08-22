import React, { useState, useEffect, useRef } from "react";
import "./Medicine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);

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
    fetchProducts(currentPage, limit, searchTerm);
  }, [currentPage, limit, searchTerm]);

  const fetchProducts = async (page = 1, limit = 10, search = "") => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/all?page=${page}&limit=${limit}&search=${search}`
      );
      setProducts(response.data.data);
      setPagination(response.data.pagination);
      setTotalPages(response.data.pagination.pages);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching items", error);
      message.error("Failed to fetch items");
      setLoading(false);
    }
  };

  const deleteProduct = async (productId) => {
    if (!window.confirm("Are you sure you want to delete this item?")) {
      return;
    }
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/product/delete/${productId}`
      );
      if (response.data.success) {
        console.log("Supplier deleted.");
        // After deleting, if this was the last item on the page and not the first page,
        // go back to previous page
        if (products.length === 1 && currentPage > 1) {
          setCurrentPage(currentPage - 1);
        } else {
          fetchProducts(currentPage, limit, searchTerm);
        }
      }
      fetchProducts();
    } catch (error) {
      console.log("Error deleting item", error);
      message.error("Failed to delete item");
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on new search
    fetchProducts(1, limit, searchTerm);
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
                  <h3 className="mb-0">List of All Items</h3>
                  <div className="ml-auto">
                    <a href="/add-item" className="btn btn-success">
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
                        placeholder="Search products..."
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

                {loading && products.length === 0 ? (
                  <div className="text-center">Loading products...</div>
                ) : error ? (
                  <div className="alert alert-danger">{error}</div>
                ) : (
                  <>
                    <table className="table table-striped table-hover">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Item Name</th>
                          <th scope="col">Price</th>
                          <th scope="col">Unit</th>
                          <th scope="col">Opening Stock</th>
                          <th scope="col">Closing Stock</th>

                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {products.length === 0 ? (
                          <tr>
                            <td colSpan="7" className="text-center">
                              No items found
                            </td>
                          </tr>
                        ) : (
                          products.map((product, index) => (
                            <tr key={product._id}>
                              <td>{(currentPage - 1) * limit + index + 1}</td>
                              <td>{product.name}</td>
                              <td>{product.price}</td>
                              <td>{product.unit}</td>
                              <td>{product.opening_stock}</td>
                              <td>{product.closing_stock}</td>

                              <td width="150">
                                <Link
                                  to={`/show-item/${product._id}`}
                                  className="btn btn-sm btn-circle btn-outline-info mr-1"
                                  title="Show"
                                >
                                  <i className="fa fa-eye"></i>
                                </Link>
                                <Link
                                  to={`/edit-item/${product._id}`}
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
                                    deleteProduct(product._id);
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
                        {products.length > 0
                          ? (currentPage - 1) * limit + 1
                          : 0}{" "}
                        to {(currentPage - 1) * limit + products.length} of{" "}
                        {pagination.total} products
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

export default Product;
