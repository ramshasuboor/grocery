import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const EditProduct = () => {
  const [data, setData] = useState({
    name: "",
    price: "",
    unit: "",
    opening_stock: "",
    closing_stock: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/v1/product/show/${id}`
        );

        if (response.data.success) {
          setData(response.data.product);
        } else {
          setError("Failed to fetch product details");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
        setError("Error fetching product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const payload = {
        name: data.name,
        price: data.price,
        unit: data.unit,
        opening_stock: data.opening_stock,
        closing_stock: data.closing_stock,
      };

      const response = await axios.patch(
        `http://localhost:4000/api/v1/product/update/${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        // Navigate back to customers list after successful update
        navigate("/items");
      } else {
        setError(response.data.message || "Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
      setError("Failed to update product");
    }
  };

  const handleCancel = () => {
    navigate("/items");
  };

  if (loading) {
    return <div className="loading">Loading product data...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  return (
    <main className="py-5">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-md-8">
            <div className="card">
              <div className="card-header card-title">
                <strong>Update Product</strong>
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
                          Product Name
                        </label>
                        <div className="col-md-9">
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="name"
                            id="name"
                            value={data.name}
                            className="form-control"
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
                            type="text"
                            name="price"
                            value={data.price}
                            id="email"
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
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="unit"
                            value={data.unit}
                            id="unit"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <div className="form-group row">
                        <label
                          htmlFor="opening_stock"
                          className="col-md-3 col-form-label"
                        >
                          Opening Stock
                        </label>
                        <div className="col-md-9">
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="opening_stock"
                            value={data.opening_stock}
                            id="opening_stock"
                            className="form-control"
                          />
                        </div>
                      </div>
                      <div className="form-group row">
                        <label
                          htmlFor="closing_stock"
                          className="col-md-3 col-form-label"
                        >
                          Closing Stock
                        </label>
                        <div className="col-md-9">
                          <input
                            onChange={onChangeHandler}
                            type="text"
                            name="closing_stock"
                            value={data.closing_stock}
                            id="closing_stock"
                            className="form-control"
                          />
                        </div>
                      </div>

                      <hr />
                      <div className="form-group row mb-0">
                        <div className="col-md-9 offset-md-3">
                          <button type="submit" className="btn btn-primary">
                            Save
                          </button>
                          <Link
                            to={"/items"}
                            className="btn btn-outline-secondary"
                          >
                            Cancel
                          </Link>
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
  );
};

export default EditProduct;
