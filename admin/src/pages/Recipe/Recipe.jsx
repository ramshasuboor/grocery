

import React, { useState, useEffect } from "react";
import "./Recipe.css";
import Select from "react-select"

const Recipe = () => {
  // Static recipes (dish → required ingredients)
  const recipesByKilo = {
    biryani: [
      { name: "Rice", qty: 1, unit: "Kg" },
      { name: "Cloves", qty: 200, unit: "g" },
      { name: "oil", qty: 1, unit: "kg" },
      { name: "Salt", qty: 200, unit: "g" },
      { name: "Zeera", qty: 4, unit: "g" },
    ],
    Tahari: [
      { name: "Rice", qty: 1, unit: "Kg" },
      { name: "Salt", qty: 200, unit: "g" },
      { name: "Zeera", qty: 10, unit: "g" },
      { name: "Cloves", qty: 5, unit: "g" },
    ],
    Tawla: [
      { name: "Salt", qty: 250, unit: "g" },
      { name: "Cloves", qty: 300, unit: "g" },
      { name: "Tilli", qty: 20, unit: "g" },
      { name: "Shahzeera", qty: 5, unit: "g" },
    ]
  };

  const recipesByMann = {
    biryani: [
      { name: "Rice", qty: 40, unit: "Kg" },
      { name: "Cloves", qty: 100, unit: "g" },
      { name: "oil", qty: 10, unit: "Kg" },
      { name: "Salt", qty: 3, unit: "Kg" },
      { name: "Zeera", qty: 100, unit: "g" },
    ],
    Tahari: [
      { name: "Rice", qty: 40, unit: "Kg" },
      { name: "Salt", qty: 300, unit: "g" },
      { name: "Zeera", qty: 200, unit: "g" },
      { name: "Cloves", qty: 150, unit: "g" },
    ],
    Tawla: [
      { name: "Salt", qty: 3, unit: "Kg" },
      { name: "Cloves", qty: 60, unit: "g" },
      { name: "Tilli", qty: 240, unit: "g" },
      { name: "Shahzeera", qty: 150, unit: "g" },
    ]
  };
  const [unit, setUnit] = useState("");
  const [dish, setDish] = useState("");
  const [dishIngredients, setDishIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [dishQty, setDishQty] = useState(1);
  const [customers, setCustomers] = useState([]);   // ✅ all customers
  const [selectedCustomer, setSelectedCustomer] = useState(null); // ✅ selected customer

  // ✅ Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/product/all");
        const json = await res.json();
        console.log("Products response:", json);

        // ✅ adjust according to backend response
        setProducts(json.data || json.products || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    const fetchCustomers = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/v1/customer/all");
        const json = await res.json();
        setCustomers(json.data || json.customers || []);
      } catch (error) {
        console.error("Error fetching customers:", error);
      }
    };

    fetchProducts();
    fetchCustomers();
  }, []);



  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dish && unit) {
      if (unit === "kg") {
        setDishIngredients(recipesByKilo[dish] || []);
      } else if (unit === "mann") {
        setDishIngredients(recipesByMann[dish] || []);
      }
    }
  };
  // ✅ Convert qty to Kg
  const toKg = (qty, unit) => {
    return unit === "Kg" ? qty : qty / 1000;
  };

  // ✅ Calculate total price
  const calculatePrice = (name, qty, unit) => {
    const product = products.find(
      (p) => p.name.toLowerCase() === name.toLowerCase()
    );
    if (!product) return 0;
    return toKg(qty, unit) * product.price * dishQty;
  };

  return (
    <>
      {/* Dish selection form */}
      <form className="recipe" onSubmit={handleSubmit}>
        <div className="recipe-row">
          <div className="recipe-field">
            <label className="form-label">Select Customer:</label>
            <Select
              className="customer-select"
              options={customers.map((c) => ({
                value: c._id,
                label: c.name,
              }))}
              value={
                selectedCustomer
                  ? customers
                    .map((c) => ({ value: c._id, label: c.name }))
                    .find((opt) => opt.value === selectedCustomer)
                  : null
              }
              onChange={(option) => setSelectedCustomer(option.value)}
              placeholder="Search or Select Customer"
              isSearchable
              required
            />
          </div>
          <div className="recipe-field">
            <label className="form-label">Select Dish:</label>
            <select
              className="form-control small-select"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              required
            >
              <option value="">-- Dish --</option>
              <option value="biryani">Biryani</option>
              <option value="Tahari">Tahari</option>
              <option value="Tawla">Tawla</option>
            </select>
          </div>
          <div className="recipe-field">
            <label className="form-label">Unit:</label>
            <select
              className="form-control small-select"
              value={unit}
              onChange={(e) => setUnit((e.target.value))}
              required
            >
              <option value="">-- Unit --</option>
              <option value="kg">Kg</option>
              <option value="mann">Mann</option>
            </select>
          </div>
          <div className="recipe-field">
            <label className="form-label">Dish Qty</label>
            <input
              type="number"
              min="1"
              className="form-control small-input"
              value={dishQty}
              onChange={(e) => setDishQty(Number(e.target.value))}
            />
          </div>

          <div className="recipe-field">
            <button type="submit" className="btn btn-success">
              List Ingredients
            </button>
          </div>
        </div>
      </form>

      {/* Ingredients table */}
      {dishIngredients.length > 0 && (
        <div className="ingredients-list mt-4">
          <h5>
            Ingredients for <strong>{dish}</strong> ({dishQty}{" "}
            {unit === "Kg" ? "Kg" : unit})
          </h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Item</th>
                <th>Required Qty</th>
                <th>Price / Kg</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {dishIngredients.map((item, index) => {
                const product = products.find(
                  (p) => p.name.toLowerCase() === item.name.toLowerCase()
                );
                const pricePerKg = product ? product.price : 0;
                const total = calculatePrice(item.name, item.qty, item.unit);

                return (
                  <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.qty * dishQty} {item.unit}</td>
                    <td>₹{pricePerKg}</td>
                    <td>₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}

              {/* ✅ Grand Total row */}
              <tr className="table-success">
                <td colSpan="3"><strong>Grand Total</strong></td>
                <td>
                  <strong>
                    ₹
                    {dishIngredients.reduce((acc, item) => {
                      return (
                        acc +
                        calculatePrice(item.name, item.qty, item.unit)
                      );
                    }, 0).toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container d-flex justify-content-center mt-5">
            <button className='btn btn-success'>Print Invoice</button>
          </div>
        </div>
      )}

    </>
  );
};

export default Recipe;
