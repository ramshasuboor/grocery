import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ShowSupplier = () => {
  const [supplier, setSupplier] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchSupplier = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:4000/api/v1/supplier/show/${id}`
      );

      if (response.data.success) {
        setSupplier(response.data.supplier);
      } else {
        console.error("Failed to fetch supplier details");
      }
    } catch (error) {
      console.error("Error fetching supplier details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupplier();
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

  if (!supplier) {
    return (
      <div className="container py-5">
        <div className="alert alert-danger">
          Supplier not found or error loading supplier data.
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
                <strong>Supplier Details</strong>
              </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group row">
                      <label htmlFor="name" className="col-md-3 col-form-label">
                        Supplier Name
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.name}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="email"
                        className="col-md-3 col-form-label"
                      >
                        Email
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.email || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="mobile"
                        className="col-md-3 col-form-label"
                      >
                        Mobile
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.mobile || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="company"
                        className="col-md-3 col-form-label"
                      >
                        Company
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.company || "N/A"}
                        </p>
                      </div>
                    </div>

                    <div className="form-group row">
                      <label
                        htmlFor="address"
                        className="col-md-3 col-form-label"
                      >
                        Address
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.address || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label htmlFor="city" className="col-md-3 col-form-label">
                        City
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.city || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="opening_balance"
                        className="col-md-3 col-form-label"
                      >
                        Opening Balance
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.opening_balance || "0"}
                        </p>
                      </div>
                    </div>
                    <div className="form-group row">
                      <label
                        htmlFor="closing_balance"
                        className="col-md-3 col-form-label"
                      >
                        Closing Balance
                      </label>
                      <div className="col-md-9">
                        <p className="form-control-plaintext text-muted">
                          {supplier.closing_balance || "0"}
                        </p>
                      </div>
                    </div>
                    <hr />
                    <div className="form-group row mb-0">
                      <div className="col-md-9 offset-md-3">
                        <button
                          onClick={() =>
                            navigate(`/edit-supplier/${supplier._id}`)
                          }
                          className="btn btn-info"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/delete-supplier/${supplier._id}`)
                          }
                          className="btn btn-outline-danger mx-2"
                        >
                          Delete
                        </button>
                        <button
                          onClick={() => navigate("/supplier")}
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

export default ShowSupplier;
