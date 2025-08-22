

import React, { useState, useEffect } from "react";
import "./Recipe.css";

const Recipe = () => {
  // Static recipes (dish → required ingredients)
  const recipes = {
    biryani: [
      { name: "Rice", qty: 1, unit: "Kg" },
      { name: "Cloves", qty: 200, unit: "g" },
      { name: "Onion", qty: 250, unit: "g" },
      { name: "Black Pepper", qty: 100, unit: "g" },
      { name: "Yogurt", qty: 200, unit: "g" },
    ],
    pulao: [
      { name: "Rice", qty: 1, unit: "Kg" },
      { name: "Onion", qty: 300, unit: "g" },
      { name: "Tomato", qty: 200, unit: "g" },
      { name: "Peas", qty: 150, unit: "g" },
    ],
  };

  const [dish, setDish] = useState("");
  const [dishIngredients, setDishIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [dishQty, setDishQty] = useState(1);

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

    fetchProducts();
  }, []);

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (dish) {
      setDishIngredients(recipes[dish] || []);
    }
  };

  // ✅ Convert qty to Kg
  const toKg = (qty, unit) => {
    return unit === "Kg" ? qty : qty / 1000;
  };

  // ✅ Calculate total price
  const calculatePrice = (name, qty, unit) => {
    const product = products.find((p) => p.name.toLowerCase() === name.toLowerCase());
    if (!product) return 0;
    return toKg(qty, unit) * product.price * dishQty;
  };

  return (
    <>
      {/* Dish selection form */}
      <form className="recipe" onSubmit={handleSubmit}>
        <div className="recipe-row">
          <div className="recipe-field">
            <label className="form-label">Select Dish:</label>
            <select
              className="form-control"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              required
            >
              <option value="">-- Select --</option>
              <option value="biryani">Biryani</option>
              <option value="pulao">Pulao</option>
            </select>
          </div>

          <div className="recipe-field">
            <label className="form-label">Dish Qty (Kg):</label>
            <input
              type="number"
              min="1"
              className="form-control"
              value={dishQty}
              onChange={(e) => setDishQty(Number(e.target.value))}
            />
          </div>

          <div className="recipe-field">
            <button type="submit" className="btn btn-success">
              List
            </button>
          </div>
        </div>
      </form>

      {/* Ingredients table */}
{dishIngredients.length > 0 && (
  <div className="ingredients-list mt-4">
    <h5>
      Ingredients for <strong>{dish}</strong> ({dishQty} Kg)
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
  </div>
)}

    </>
  );
};

export default Recipe;
