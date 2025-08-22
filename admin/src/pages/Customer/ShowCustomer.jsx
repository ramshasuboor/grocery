import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Customer.css";

const ShowCustomer = () => {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/v1/customer/show/${id}`
        );

        if (response.data.success) {
          setCustomer(response.data.customer);
        } else {
          console.error("Failed to fetch customer details");
        }
      } catch (error) {
        console.error("Error fetching customer details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleBack = () => {
    navigate("/customer");
  };

  if (loading) {
    return <div className="loading">Loading customer details...</div>;
  }

  if (!customer) {
    return <div className="error">Customer not found</div>;
  }

  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-title">
                  <strong>Customer Details</strong>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label
                          htmlFor="first_name"
                          className="col-md-3 col-form-label"
                        >
                          Customer Name
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.name}
                          </p>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="last_name"
                          className="col-md-3 col-form-label"
                        >
                          Email
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.email || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="email"
                          className="col-md-3 col-form-label"
                        >
                          Mobile
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.mobile || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="phone"
                          className="col-md-3 col-form-label"
                        >
                          Company
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.company || "N/A"}
                          </p>
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-md-3 col-form-label"
                        >
                          Address
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.address || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-md-3 col-form-label"
                        >
                          City
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.city || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-md-3 col-form-label"
                        >
                          Opening Balance
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.opening_balance || "0"}
                          </p>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-md-3 col-form-label"
                        >
                          Closing Balance
                        </label>
                        <div className="col-md-9">
                          <p className="form-control-plaintext text-muted">
                            {customer.closing_balance || "0"}
                          </p>
                        </div>
                      </div>
                      <hr />
                      <div className="form-group row mb-0">
                        <div className="col-md-9 offset-md-3">
                          <button
                            onClick={() =>
                              navigate(`/edit-customer/${customer._id}`)
                            }
                            className="btn btn-info"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() =>
                              navigate(`/delete-customer/${customer._id}`)
                            }
                            className="btn btn-outline-danger mx-2"
                          >
                            Delete
                          </button>
                          <button
                            onClick={() => navigate("/customer")}
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
    </>
  );
};

export default ShowCustomer;
