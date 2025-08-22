import React, { useState, useEffect, useRef } from "react";
import "./Medicine.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const Medicine = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:4000/api/v1/product/all"
      );
      setProducts(response.data.products);
    } catch (error) {
      console.log("Error fetching products", error);
      message.error("Failed to fetch products");
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/v1/product/delete/${productId}`
      );
      if (response.data.success) {
        console.log("Product deleted.");
      }
      fetchProducts();
    } catch (error) {
      console.log("Error deleting product", error);
      message.error("Failed to delete product");
    }
  };

  return (
    <>
      <div className="section-title">Medicine</div>
      <a href="/add-medicine">Add Medicine</a>
      <table id="example" className="display">
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Price</th>
            <th>Opening Stock</th>
            <th>Closing Stock</th>
            <th>Unit</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.opening_stock}</td>
              <td>{product.opening_stock}</td>
              <td>{product.unit}</td>
              <td>
                <FontAwesomeIcon
                  color="red"
                  icon={faTrashAlt}
                  onClick={() => deleteProduct(product._id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Medicine;
