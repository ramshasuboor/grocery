import React from 'react'
import "./ReverseCalculation.css"
import { useState, useEffect } from 'react';
import Select from "react-select"
import { useRef } from 'react';

const ReverseCalculation = () => {

    const [items, setItems] = useState([]);
    const [selectedItems, setSelectedItems] = useState(null)
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

    const selectRef = useRef(null)
    const amountRef = useRef(null)


    useEffect(() => {
        if (selectRef.current) {
            selectRef.current.focus();
        }
    }, []);
    
    return (
        <>
            <form action="">
                <div className="reverse-calculation">
                    <div className="form-row">
                        <div className="col-md">
                            <label htmlFor="item" className='form-label'>Items:</label>
                            <Select
                                id="item"
                                className='large'
                                classNamePrefix="custom-select"
                                ref={selectRef}
                                options={items.map((item) => ({
                                    value: item._id,
                                    label: item.name,
                                }))}
                                value={
                                    selectedItems
                                        ? { value: selectedItems._id, label: selectedItems.name }
                                        : null
                                }
                                onChange={(option) => {
                                    const item = items.find((i) => i._id === option.value);
                                    setSelectedItems(item || null);
                                    if (amountRef.current) {
                                        amountRef.current.focus();
                                    }
                                }}
                                placeholder="Search or Select Item"
                                isSearchable
                            />

                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Price:</label>
                            <input type="number" name='price'  placeholder='Price' className='form-control small' value={selectedItems?.price || ""} />
                        </div>
                        <div className="col-md">
                            <label htmlFor="unit">Unit:</label>
                            <input type="text" name='unit'   placeholder='Unit' className='form-control small' value={selectedItems?.unit || ""} />
                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Amount:</label>
                            {/* <input type="number" name='amount' placeholder='Amount' className='form-control' value={form.amount}
                                onChange={handleChange} /> */}
                            <input
                                type="text" // ✅ "number" ke jagah text
                                inputMode="decimal" // ✅ mobile pe number keypad
                                name="amount" 
                                ref={amountRef}
                                placeholder="Amount"
                                className="form-control small"
                                value={form.amount}
                                onChange={(e) => {
                                    let val = e.target.value;

                                    // 🔹 Replace Hindi/Devnagari digits with English
                                    const devnagariDigits = "०१२३४५६७८९";
                                    val = val.replace(/[०-९]/g, (d) => devnagariDigits.indexOf(d));

                                    // 🔹 Replace Hindi danda "।" with dot
                                    val = val.replace(/।/g, ".");

                                    // 🔹 Remove sab letters, sirf 0-9 aur dot rakho
                                    val = val.replace(/[^0-9.]/g, "");

                                    // 🔹 Sirf ek dot allow karo
                                    if ((val.match(/\./g) || []).length > 1) {
                                        val = val.substring(0, val.length - 1);
                                    }

                                    handleChange({ target: { name: "amount", value: val } });
                                }}
                            />

                        </div>
                        <div className="col-md">
                            <label htmlFor="price">Quantity:</label>
                            <input type="number" name='Quantity'   placeholder='Quantity' className='form-control small' value={form.quantity}
                                onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default ReverseCalculation