import React, { useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    opening_stock: "0",
    closing_stock: "0",
    unit: "Kg",
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
      price: data.price,
      opening_stock: Number(data.opening_stock),
      closing_stock: Number(data.closing_stock),
      unit: data.unit,
    };

    const response = await axios.post(
      `http://localhost:4000/api/v1/product/add`,
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
        price: "",
        opening_stock: "",
        closing_stock: "",
        unit: "Kg",
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
                  <strong>Add New Item</strong>
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
                            Item Name
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
                            htmlFor="price"
                            className="col-md-3 col-form-label"
                          >
                            Price
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.price}
                              type="text"
                              name="price"
                              id="price"
                              className="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="opening_stock"
                            class="col-md-3 col-form-label"
                          >
                            Opening Stock
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.opening_stock}
                              type="text"
                              name="opening_stock"
                              id="opening_stock"
                              class="form-control"
                            />
                          </div>
                        </div>

                        <div className="form-group row">
                          <label
                            htmlFor="closing_stock"
                            class="col-md-3 col-form-label"
                          >
                            Closing Stock
                          </label>
                          <div className="col-md-9">
                            <input
                              onChange={onChangeHandler}
                              value={data.closing_stock}
                              type="text"
                              name="closing_stock"
                              id="closing_stock"
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="form-group row">
                          <label
                            htmlFor="unit"
                            className="col-md-3 col-form-label"
                          >
                            Unit
                          </label>
                          <div className="col-md-9">
                            <select
                              className="form-control"
                              name="unit"
                              onChange={onChangeHandler}
                            >
                              <option value="Kg">Kg</option>
                              <option value="No">No</option>
                            </select>
                          </div>
                        </div>
                        <hr />
                        <div className="form-group row mb-0">
                          <div className="col-md-9 offset-md-3">
                            <button type="submit" className="btn btn-primary">
                              Save
                            </button>
                            <a
                              href="/items"
                              className="btn btn-outline-secondary"
                            >
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

export default AddProduct;
