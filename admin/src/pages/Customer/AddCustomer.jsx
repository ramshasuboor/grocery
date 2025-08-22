import React, { useState } from "react";
import axios from "axios";

const AddCustomer = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    mobile: "0",
    company: "",
    address: "0",
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
      `http://localhost:4000/api/v1/customer/add`,
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
      <div className="section-title">Add New Customer</div>
      <div className="add-form">
        <form onSubmit={onSubmitHandler}>
          <div className="form-group">
            <label>Name:</label>
            <input
              onChange={onChangeHandler}
              value={data.name}
              type="text"
              className="form-control"
              name="name"
              placeholder="Enter Name"
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              onChange={onChangeHandler}
              value={data.email}
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter Email"
            />
          </div>
          <div className="form-group">
            <label>Mobile:</label>
            <input
              onChange={onChangeHandler}
              value={data.mobile}
              type="text"
              className="form-control"
              name="mobile"
              placeholder="Enter Mobile"
            />
          </div>
          <div className="form-group">
            <label>Company:</label>
            <input
              onChange={onChangeHandler}
              value={data.company}
              type="text"
              className="form-control"
              name="company"
              placeholder="Enter Company"
            />
          </div>
          <div className="form-group">
            <label>Address:</label>
            <input
              type="text"
              className="form-control"
              name="address"
              onChange={onChangeHandler}
              value={data.address}
              placeholder="Enter Address"
            />
          </div>
          <div className="form-group">
            <label>City:</label>
            <input
              type="text"
              className="form-control"
              name="city"
              onChange={onChangeHandler}
              value={data.city}
              placeholder="Enter City"
            />
          </div>
          <div className="form-group">
            <label>Opening Balance:</label>
            <input
              type="text"
              className="form-control"
              name="opening_balance"
              onChange={onChangeHandler}
              value={data.opening_balance}
              placeholder="Enter Opening Balance"
            />
          </div>
          <div className="form-group">
            <label>Closing Balance:</label>
            <input
              type="text"
              className="form-control"
              name="closing_balance"
              onChange={onChangeHandler}
              value={data.closing_balance}
              placeholder="Enter Closing Balance"
            />
          </div>

          <button className="add-button" type="submit">
            Add Customer
          </button>
        </form>
      </div>
    </>
  );
};

export default AddCustomer;
