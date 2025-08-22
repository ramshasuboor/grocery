import React from 'react'
import "./ReverseCalculation.css"
import { useState, useEffect } from 'react';

const ReverseCalculation = () => {

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState([null])
    const [form, setForm] = useState({
        amount: "",
        quantity: "",
    });

    useEffect(() => {
        const fetchItems = async () => {
            try {
                const res = await fetch("http://localhost:4000/api/v1/product/all");
                const json = await res.json();
                console.log("Items response:", json);

                // ✅ adjust according to backend response
                setItems(json.data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchItems();
    }, []);

    const handleItemChange = (e) => {
        const itemId = e.target.value;
        const item = items.find((item) => item._id === itemId);
        setSelectedItems(item || null);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        let updatedForm = { ...form, [name]: value };

        if (name === "amount" && selectedItems) {
            updatedForm.quantity = (value / selectedItems.price).toFixed(3); // auto calc
        }
        setForm(updatedForm);
    };

    return (
        <>
            <form action="">
                <div className="reverse-calculation">
                    <div className="form-row">
                        <div className="col-md">
                            <label htmlFor="item" className='form-label'>Items:</label>
                            <select name="item" id="item" className='form-control'
                                onChange={handleItemChange}
                            >
                                <option value="">-----Select-----</option>
                                {items.map((item) => (
                                    <option key={item._id} value={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Price:</label>
                            <input type="number" name='price' placeholder='Price' className='form-control' value={selectedItems?.price || ""} />
                        </div>
                        <div className="col-md">
                            <label htmlFor="unit">Unit:</label>
                            <input type="text" name='unit' placeholder='Unit'  className='form-control' value={selectedItems?.unit || ""} />
                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Amount:</label>
                            <input type="number" name='amount' placeholder='Amount' className='form-control' value={form.amount}
                                onChange={handleChange} />
                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Quantity:</label>
                            <input type="number" name='Quantity' placeholder='Quantity' className='form-control' value={form.quantity}
                                onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ReverseCalculation