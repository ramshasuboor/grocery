import { Product } from "../models/productModel.js";

export const addProduct = async (req, res) => {
  try {
    const { name, price, opening_stock, closing_stock, unit } = req.body;

    await Product.create({
      name,
      price,
      opening_stock,
      closing_stock,
      unit,
    });
    res
      .status(201)
      .json({ success: true, message: "Product added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add product.",
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 1000,
      sort = "-createdAt",
      search = "",
    } = req.query;

    // Build search query
    const query = {};
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ];
    }

    const options = {
      page: parseInt(page, 10),
      limit: parseInt(limit, 10),
      sort: sort,
    };
    const products = await Product.paginate(query, options);

    res.status(200).json({
      success: true,
      message: "Products fetched.",
      data: products.docs, // Fixed: docs not doc
      pagination: {
        total: products.totalDocs,
        limit: products.limit,
        page: products.page,
        pages: products.totalPages,
        hasNextPage: products.hasNextPage,
        hasPrevPage: products.hasPrevPage,
        nextPage: products.nextPage,
        prevPage: products.prevPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get products.",
    });
  }
};

export const getProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);
    res.status(200).json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get product.",
    });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, opening_stock, closing_stock, unit } = req.body;

    const product = await Product.findById(id);

    // Check if product exists
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        opening_stock,
        closing_stock,
        unit,
      },
      { new: true } // Returns the updated document
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update product",
    });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findById(productId);

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    await product.deleteOne();
    res.status(200).json({
      success: true,
      message: "Product delete successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete product.",
    });
  }
};
