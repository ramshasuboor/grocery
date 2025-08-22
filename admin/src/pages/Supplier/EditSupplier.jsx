import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditSupplier = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "",
    company: "",
    address: "",
    city: "",
    opening_balance: "",
    closing_balance: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSupplier = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/v1/supplier/show/${id}`
        );

        if (response.data.success) {
          setData(response.data.supplier);
        } else {
          setError("Failed to fetch supplier details");
        }
      } catch (error) {
        console.error("Error fetching supplier details:", error);
        setError("Error fetching supplier details");
      } finally {
        setLoading(false);
      }
    };

    fetchSupplier();
  }, [id]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        company: data.company,
        address: data.address,
        city: data.city,
        opening_balance: data.opening_balance,
        closing_balance: data.closing_balance,
      };

      const response = await axios.patch(
        `http://localhost:4000/api/v1/supplier/update/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Navigate back to customers list after successful update
        navigate("/supplier");
      } else {
        setError(response.data.message || "Failed to update supplier");
      }
    } catch (error) {
      console.error("Error updating supplier:", error);
      setError("Failed to update supplier");
    }
  };

  const handleCancel = () => {
    navigate("/supplier");
  };

  if (loading) {
    return <div className="loading">Loading supplier data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Update Supplier</strong>
              </div>
              <form onSubmit={onSubmitHandler}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="form-group row">
                        <label
                          htmlFor="name"
                          className="col-md-3 col-form-label"
                        >
                          Supplier Name
                        </label>
                        <div className="col-md-9">
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            className="form-control"
                          />
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
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="email"
                            value={data.email}
                            id="email"
                            className="form-control"
                          />
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
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="mobile"
                            value={data.mobile}
                            id="mobile"
                            className="form-control"
                          />
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
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="company"
                            value={data.company}
                            id="company"
                            className="form-control"
                          />
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
                          <textarea
                            onChange={onChangeHandler}
                            name="address"
                            id="address"
                            rows="3"
                            className="form-control"
                          >
                            {data.address}
                          </textarea>
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="phone"
                          className="col-md-3 col-form-label"
                        >
                          City
                        </label>
                        <div className="col-md-9">
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="city"
                            value={data.city}
                            id="city"
                            className="form-control"
                          />
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
                          <input
                            type="text"
                            name="opening_balance"
                            value={data.opening_balance}
                            id="opening_balance"
                            className="form-control"
                            disabled
                          />
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
                          <input
                            type="text"
                            name="closing_balance"
                            value={data.closing_balance}
                            id="closing_balance"
                            className="form-control"
                            disabled
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
                            to={"/supplier"}
                            className="btn btn-outline-secondary"
                          >
                            Cancel
                          </Link>
                        </div>
                      </div>
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

export default EditSupplier;
