import React, { useState, useEffect, useRef } from "react";
import "./Recipe.css";
import Select from "react-select";
import { useNavigate } from "react-router-dom";

const Recipe = () => {
  const navigate = useNavigate();
  // Static recipes (dish → required ingredients)
  const recipesByKilo = {
    biryani: [
      { name: "चावल", qty: 1, unit: "Kg" },
      { name: "तेल", qty: 1, unit: "Kg" },
      { name: "नमक", qty: 1, unit: "No" },
      { name: "बटाना दाल", qty: 200, unit: "g" },
      { name: "लौंग", qty: 4, unit: "g" },
      { name: "इलायची", qty: 4, unit: "g" },
      { name: "कलमी", qty: 4, unit: "g" },
      { name: "काली मिर्च", qty: 4, unit: "g" },
      { name: "जीरा", qty: 4, unit: "g" },
      { name: "शाह जीरा", qty: 2, unit: "g" },
      { name: "जायफल", qty: 1, unit: "No" },
      { name: "जायपत्री", qty: 1, unit: "g" },
      { name: "धना पाउडर", qty: 10, unit: "g" },
      { name: "मिर्च पाउडर खुला", qty: 10, unit: "g" },
      { name: "हल्दी पाउडर खुला", qty: 10, unit: "g" },
      { name: "चाट मशाला १०० GRM", qty: 1, unit: "No" },
    ],
    tahari: [
      { name: "Rice", qty: 1, unit: "Kg" },
      { name: "Salt", qty: 200, unit: "g" },
      { name: "Zeera", qty: 10, unit: "g" },
      { name: "Cloves", qty: 5, unit: "g" },
    ],
    tawla: [
      { name: "Salt", qty: 250, unit: "g" },
      { name: "Cloves", qty: 300, unit: "g" },
      { name: "Tilli", qty: 20, unit: "g" },
      { name: "Shahzeera", qty: 5, unit: "g" },
    ],
  };

  const recipesByMann = {
    biryani: [
      { name: "चावल", qty: 40, unit: "Kg" },
      { name: "तेल", qty: 10, unit: "Kg" },
      { name: "नमक", qty: 3, unit: "No" },
      { name: "बटाना दाल", qty: 6, unit: "Kg" },
      { name: "लौंग", qty: 100, unit: "g" },
      { name: "इलायची", qty: 100, unit: "g" },
      { name: "कलमी", qty: 100, unit: "g" },
      { name: "काली मिर्च", qty: 100, unit: "g" },
      { name: "जीरा", qty: 100, unit: "g" },
      { name: "शाह जीरा", qty: 25, unit: "g" },
      { name: "जायफल", qty: 4, unit: "No" },
      { name: "जायपत्री", qty: 20, unit: "g" },
      { name: "रंग", qty: 10, unit: "g" },
      { name: "केवड़ा सिंगल", qty: 1, unit: "No" },
      { name: "धना पाउडर", qty: 375, unit: "g" },
      { name: "मिर्च पाउडर खुला", qty: 375, unit: "g" },
      { name: "हल्दी पाउडर खुला", qty: 250, unit: "g" },
      { name: "चाट मशाला १०० GRM", qty: 1, unit: "No" },
      { name: "कस्तूरी मेथी 100", qty: 1, unit: "No" },
    ],
    tahari: [
      { name: "चावल", qty: 40, unit: "Kg" },
      { name: "तेल", qty: 10, unit: "Kg" },
      { name: "मिर्च पाउडर खुला", qty: 240, unit: "g" },
      { name: "धना पाउडर", qty: 240, unit: "g" },
      { name: "हल्दी पाउडर खुला", qty: 240, unit: "g" },
      { name: "लौंग", qty: 60, unit: "g" },
      { name: "इलायची", qty: 60, unit: "g" },
      { name: "कलमी", qty: 60, unit: "g" },
      { name: "काली मिर्च", qty: 60, unit: "g" },
      { name: "जीरा", qty: 80, unit: "g" },
      { name: "केवड़ा सिंगल", qty: 1, unit: "No" },
      { name: "तेजपान", qty: 120, unit: "g" },
    ],
    tawla: [
      { name: "जवस तेल खुला", qty: 4, unit: "Kg" },
      { name: "राई तेल", qty: 4, unit: "Kg" },
      { name: "धना पाउडर", qty: 2, unit: "Kg" },
      { name: "मिर्च पाउडर खुला", qty: 800, unit: "g" },
      { name: "हल्दी पाउडर खुला", qty: 250, unit: "g" },
      { name: "लौंग", qty: 60, unit: "g" },
      { name: "इलायची", qty: 60, unit: "g" },
      { name: "कलमी", qty: 60, unit: "g" },
      { name: "काली मिर्च", qty: 60, unit: "g" },
      { name: "जीरा", qty: 250, unit: "g" },
      { name: "शाह जीरा", qty: 100, unit: "g" },
      { name: "तिल्ली सफेद", qty: 250, unit: "g" },
      { name: "सेंगदाना लाल", qty: 250, unit: "g" },
      { name: "खोबरा किस", qty: 250, unit: "g" },
      { name: "मगज तरबूज", qty: 250, unit: "g" },
      { name: "नमक", qty: 3, unit: "No" },
    ],
  };
  const [unit, setUnit] = useState("");
  const [dish, setDish] = useState("");
  const [dishIngredients, setDishIngredients] = useState([]);
  const [products, setProducts] = useState([]);
  const [dishQty, setDishQty] = useState(1);
  const [customers, setCustomers] = useState([]); // ✅ all customers
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
        setDishIngredients(recipesByKilo[dish.toLowerCase()] || []);
      } else if (unit === "mann") {
        setDishIngredients(recipesByMann[dish.toLowerCase()] || []);
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

  const handleListIngredients = () => {
    if (dish && unit) {
      if (unit === "kg") {
        setDishIngredients(recipesByKilo[dish.toLowerCase()] || []);
      } else if (unit === "mann") {
        setDishIngredients(recipesByMann[dish.toLowerCase()] || []);
      }
    }
  };
  const handlePrintInvoice = () => {
    const now = new Date();
    const invoiceNo = now
      .toISOString() // "2025-09-01T09:20:35.123Z"
      .replace(/[-T:.Z]/g, "") // "20250901092035123"
      .slice(2, 14); // "250901092035"

    const invoiceData = {
      customer: {
        _id: selectedCustomer?.value || null,
        name: selectedCustomer?.label || "Cash Sale",
        address: selectedCustomer?.address || "",
        mobile: selectedCustomer?.mobile || "",
      },
      dish,
      dishQty,
      unit,
      invoiceNo, // simple unique number
      date: now,
      ingredients: dishIngredients.map((item) => {
        const product = products.find(
          (p) => p.name.toLowerCase() === item.name.toLowerCase()
        );
        if (!product) {
          console.log("❌ Product not found:", item.name);
        } else {
          console.log(
            "✅ Matched Product:",
            product.name,
            " Price:",
            product.price
          );
        }
        const pricePerKg = product ? product.price : 0;
        const total =
          (item.unit === "Kg" ? item.qty : item.qty / 1000) *
          pricePerKg *
          dishQty;

        return {
          ...item,
          pricePerKg,
          total: total.toFixed(2),
        };
      }),
      grandTotal: dishIngredients
        .reduce(
          (acc, item) => acc + calculatePrice(item.name, item.qty, item.unit),
          0
        )
        .toFixed(2),
    };

    navigate("/recipe-invoice", { state: invoiceData });
  };

  const customerRef = useRef(null);
  const dishRef = useRef(null);
  const unitRef = useRef(null);
  const dishQtyRef = useRef(null);

  const listRef = useRef(null);
  const printRecipeRef = useRef(null);

  // Page reload hone ke baad pehle customer input par focus
  useEffect(() => {
    if (customerRef.current) {
      customerRef.current.focus();
    }
  }, []);

  // Jab Enter press kare to agla input focus ho
  const handleKeyDown = (e, nextRef) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };
  return (
    <>
      {/* Dish selection form */}
      <form className="recipe" onSubmit={handleSubmit}>
        <div className="recipe-row">
          <div className="recipe-field">
            <label className="form-label">Select Customer:</label>
            <Select
              ref={customerRef}
              className="customer-select"
              options={customers.map((c) => ({
                value: c._id,
                label: c.name,
                address: c.address,
                mobile: c.mobile,
              }))}
              value={selectedCustomer}
              onChange={(option) => {
                setSelectedCustomer(option); // customer select ho jaye
                // enter se bhi direct dish par focus
                setTimeout(() => {
                  dishRef.current?.focus();
                }, 100);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && selectedCustomer) {
                  e.preventDefault();
                  dishRef.current?.focus();
                }
              }}
              placeholder="Search or Select Customer"
              isSearchable
              required
            />
          </div>
          <div className="recipe-field">
            <label className="form-label">Select Dish:</label>
            <select
              ref={dishRef}
              onKeyDown={(e) => handleKeyDown(e, unitRef)}
              className="form-control small-select"
              value={dish}
              onChange={(e) => setDish(e.target.value)}
              required
            >
              <option value="">-- Dish --</option>
              <option value="biryani">Biryani</option>
              <option value="tahari">Tahari</option>
              <option value="tawla">Tawla</option>
            </select>
          </div>
          <div className="recipe-field">
            <label className="form-label">Unit:</label>
            <select
              ref={unitRef}
              onKeyDown={(e) => handleKeyDown(e, dishQtyRef)}
              className="form-control small-select"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
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
              ref={dishQtyRef}
              onKeyDown={(e) => handleKeyDown(e, listRef)}
              type="number"
              min="1"
              className="form-control small-input"
              value={dishQty}
              onChange={(e) => setDishQty(Number(e.target.value))}
            />
          </div>

          {/* <div className="recipe-field">
            <button type="submit" className="btn btn-success" ref={listRef}
              onKeyDown={(e) => handleKeyDown(e, printRecipeRef)}>
              List Ingredients
            </button>
          </div> */}
          <div className="recipe-field">
            <button
              type="button"
              className="btn btn-success"
              ref={listRef}
              onClick={() => {
                handleListIngredients();
                setTimeout(() => printRecipeRef.current?.focus(), 100);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleListIngredients();
                  setTimeout(() => printRecipeRef.current?.focus(), 100);
                }
              }}
            >
              List Ingredients
            </button>
          </div>
        </div>
      </form>

      {/* Ingredients table */}
      {dishIngredients.length > 0 && (
        <div className="ingredients-list mt-4">
          <h5>
            Ingredients for <strong>{dish.charAt(0).toUpperCase() + dish.slice(1)}</strong> ({dishQty}{" "}
            {unit === "kg" ? "Kg" : unit === "mann" ? "Mann" :unit})
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
                    <td>
                      {item.qty * dishQty} {item.unit}
                    </td>
                    <td>₹{pricePerKg}</td>
                    <td>₹{total.toFixed(2)}</td>
                  </tr>
                );
              })}

              {/* ✅ Grand Total row */}
              <tr className="table-success">
                <td colSpan="3">
                  <strong>Grand Total</strong>
                </td>
                <td>
                  <strong>
                    ₹
                    {dishIngredients
                      .reduce((acc, item) => {
                        return (
                          acc + calculatePrice(item.name, item.qty, item.unit)
                        );
                      }, 0)
                      .toFixed(2)}
                  </strong>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="button-container d-flex justify-content-center mt-5">
            <button
              className="btn btn-success"
              ref={printRecipeRef}
              onClick={handlePrintInvoice}
            >
              Print Invoice
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Recipe;
