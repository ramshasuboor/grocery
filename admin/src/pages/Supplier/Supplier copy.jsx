import React, { useEffect, useState, useRef } from "react";
import "./Supplier.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faEdit, faEye } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { Link } from "react-router-dom";

const Supplier = () => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/supplier/all"
      );
      setSuppliers(response.data.suppliers);
    } catch (error) {
      console.log("Error fetching suppliers", error);
      message.error("Failed to fetch suppliers");
    }
  };

  const deleteSupplier = async (supplierId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/supplier/delete/${supplierId}`
      );
      if (response.data.success) {
        console.log("Supplier deleted.");
      }
      fetchSuppliers();
    } catch (error) {
      console.log("Error deleting supplier.", error);
      message.error("Failed to delete supplier.");
    }
  };

  const viewSupplier = async (customerId) => {
    console.log("View Supplier");
  };

  const editSupplier = async (customerId) => {
    console.log("View Supplier");
  };

  return (
    <>
      <main className="">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header card-title">
                <div className="d-flex align-items-center">
                  <h2 className="mb-0">List of All Suppliers</h2>
                  <div className="ml-auto">
                    <a href="/add-supplier" className="btn btn-success">
                      <i className="fa fa-plus-circle"></i> Add New
                    </a>
                  </div>
                </div>
              </div>
              <div className="card-body">
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Supplier Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Mobile</th>
                      <th scope="col">Company</th>
                      <th scope="col">City</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {suppliers.map((supplier, index) => (
                      <tr>
                        <td>1</td>
                        <td>{supplier.name}</td>
                        <td>{supplier.email}</td>
                        <td>{supplier.mobile}</td>
                        <td>{supplier.company}</td>
                        <td>{supplier.city}</td>
                        <td width="150">
                          <Link
                            to={`/show-supplier/${supplier._id}`}
                            className="btn btn-sm btn-circle btn-outline-info mr-1"
                            title="Show"
                          >
                            <i className="fa fa-eye"></i>
                          </Link>
                          <Link
                            to={`/edit-supplier/${supplier._id}`}
                            className="btn btn-sm btn-circle btn-outline-secondary mr-1"
                            title="Edit"
                          >
                            <i className="fa fa-edit"></i>
                          </Link>
                          <a
                            href="#"
                            className="btn btn-sm btn-circle btn-outline-danger"
                            title="Delete"
                            onClick={() => deleteSupplier(supplier._id)}
                          >
                            <i className="fa fa-times"></i>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <nav aria-label="Page navigation example">
                  <ul class="pagination justify-content-end">
                    <li class="page-item disabled">
                      <a class="page-link">Previous</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Supplier;
