import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ShowProduct = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/product/show/${id}`
      );

      if (response.data.success) {
        setProduct(response.data.product);
      } else {
        console.error("Failed to fetch product details");
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="container text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Product not found or error loading supplier data.
        </div>
      </div>
    );
  }
  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Product Details</strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label htmlFor="name" className="col-md-3 col-form-label">
                        Product Name
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {product.name}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="price"
                        className="col-md-3 col-form-label"
                      >
                        Price
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {product.price || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="unit" className="col-md-3 col-form-label">
                        Unit
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {product.unit || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="opening_stock"
                        className="col-md-3 col-form-label"
                      >
                        Opening Stock
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {product.opening_stock || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="closing_stock"
                        className="col-md-3 col-form-label"
                      >
                        Closing Stock
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {product.closing_stock || "N/A"}
                        </p>
                      </div>
                    </div>

                    <hr />
                    <div className="form-group row mb-0">
                      <div className="col-md-9 offset-md-3">
                        <button
                          onClick={() => navigate(`/edit-item/${product._id}`)}
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/delete-item/${product._id}`)
                          }
                          className="btn btn-outline-danger mx-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigate("/items")}
                          className="btn btn-outline-secondary"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ShowProduct;
