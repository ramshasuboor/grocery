import React, { useEffect, useState, useRef } from "react";
import "./Customer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customer = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const tableRef = useRef(null);
  // const dataTableRef = useRef(null);

  useEffect(() => {
    fetchCustomers();
    // // Clean up DataTable when component unmounts
    // return () => {
    //   if (dataTableRef.current) {
    //     dataTableRef.current.destroy();
    //   }
    // };
  }, []);

  // useEffect(() => {
  //   // Initialize or reinitialize DataTable when products change
  //   if (customers.length > 0) {
  //     // Destroy existing DataTable instance if it exists
  //     if (dataTableRef.current) {
  //       dataTableRef.current.destroy();
  //     }

  //     // Initialize new DataTable
  //     const dt = $(tableRef.current).DataTable();
  //     dataTableRef.current = dt;
  //   }
  // }, [customers]);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/customer/all"
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.log("Error fetching customers", error);
      message.error("Failed to fetch customers");
    }
  };

  const deleteCustomer = async (customerId) => {
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
  const viewCustomer = (customerId) => {
    console.log("Eye Clicked ");
    navigate(`/view-customer/${customerId}`);
  };

  const editCustomer = async (customerId) => {
    navigate(`/edit-customer/${customerId}`);
  };

  return (
    <>
      <a href="/add-customer">Add Customer</a>
      <div className="section-title">List of All Customers</div>
      <table id="example" className="display" ref={tableRef}>
        <thead>
          <tr>
            <th>Customer Name</th>
            <th>Email</th>
            <th>Mobile</th>
            <th>Address</th>
            <th>City</th>
            {/* <th>Opening Balance</th>
            <th>Closing Balance</th> */}
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.name}</td>
              <td>{customer.email}</td>
              <td>{customer.mobile}</td>
              <td>{customer.address}</td>
              <td>{customer.city}</td>
              {/* <td>{customer.opening_balance}</td>
              <td>{customer.closing_balance}</td> */}
              <td>
                <FontAwesomeIcon
                  color="black"
                  icon={faEye}
                  onClick={() => viewCustomer(customer._id)}
                />
                <FontAwesomeIcon
                  color="black"
                  icon={faEdit}
                  onClick={() => editCustomer(customer._id)}
                />
                <FontAwesomeIcon
                  color="red"
                  icon={faTrashAlt}
                  onClick={() => deleteCustomer(customer._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Customer;
