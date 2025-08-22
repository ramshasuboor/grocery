import React, { useState } from "react";
import axios from "axios";

const AddSupplier = () => {
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

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
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

    const response = await axios.post(
      `http://localhost:4000/api/v1/supplier/add`,
      payload,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.data.success) {
      setData({
        name: "",
        email: "",
        mobile: "",
        company: "",
        address: "",
        city: "",
        opening_balance: "",
        closing_balance: "",
      });
    } else {
      console.error(response.data.message);
    }
  };
  return (
    <>
      <main className="py-5">
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-8">
              <div className="card">
                <div className="card-header card-title">
                  <strong>Add New Supplier</strong>
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
                              value={data.name}
                              type="text"
                              name="name"
                              id="name"
                              class="form-control"
                            />
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
                            <input
                              onChange={onChangeHandler}
                              value={data.email}
                              type="text"
                              name="email"
                              id="email"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="mobile"
                            class="col-md-3 col-form-label"
                          >
                            Mobile
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.mobile}
                              type="text"
                              name="mobile"
                              id="mobile"
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="company"
                            class="col-md-3 col-form-label"
                          >
                            Company
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.company}
                              type="text"
                              name="company"
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
                              value={data.address}
                              name="address"
                              id="address"
                              rows="3"
                              className="form-control"
                            ></textarea>
                          </div>
                        </div>
                        <div className="form-group row">
                          <label htmlFor="city" class="col-md-3 col-form-label">
                            City
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.city}
                              type="text"
                              name="city"
                              id="city"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="opening_balance"
                            class="col-md-3 col-form-label"
                          >
                            Opening Balance
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.opening_balance}
                              type="text"
                              name="opening_balance"
                              id="opening_balance"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="closing_balance"
                            class="col-md-3 col-form-label"
                          >
                            Closing Balance
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.closing_balance}
                              type="text"
                              name="closing_balance"
                              id="closing_balance"
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
                            <a href="/" className="btn btn-outline-secondary">
                              Cancel
                            </a>
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
    </>
  );
};

export default AddSupplier;
