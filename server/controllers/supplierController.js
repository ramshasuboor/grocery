import { Supplier } from "../models/supplierModel.js";

export const addSupplier = async (req, res) => {
  try {
    const {
      name,
      email,
      mobile,
      company,
      address,
      city,
      opening_balance,
      closing_balance,
    } = req.body;

    await Supplier.create({
      name,
      email,
      mobile,
      company,
      address,
      city,
      opening_balance,
      closing_balance,
    });
    res
      .status(201)
      .json({ success: true, message: "Supplier added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add supplier" });
  }
};

export const getSuppliers = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
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

    const suppliers = await Supplier.paginate(query, options);
    res.status(200).json({
      success: true,
      message: "Suppliers fetched.",
      data: suppliers.docs, // Fixed: docs not doc
      pagination: {
        total: suppliers.totalDocs,
        limit: suppliers.limit,
        page: suppliers.page,
        pages: suppliers.totalPages,
        hasNextPage: suppliers.hasNextPage,
        hasPrevPage: suppliers.hasPrevPage,
        nextPage: suppliers.nextPage,
        prevPage: suppliers.prevPage,
      },
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to get suppliers" });
  }
};

export const getSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);
    res.status(200).json({
      success: true,
      supplier,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get supplier.",
    });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      name,
      email,
      mobile,
      company,
      address,
      city,
      opening_balance,
      closing_balance,
    } = req.body;

    const supplier = await Supplier.findById(id);

    // Check if customer exists
    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }
    const updatedSupplier = await Supplier.findByIdAndUpdate(
      id,
      {
        name,
        email,
        mobile,
        address,
        city,
        company,
        opening_balance,
        closing_balance,
      },
      { new: true } // Returns the updated document
    );

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedSupplier,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update supplier",
    });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplierId = req.params.id;
    const supplier = await Supplier.findById(supplierId);
    if (!supplier) {
      return res
        .status(404)
        .json({ success: false, message: "Supplier not found." });
    }

    await supplier.deleteOne();
    res.status(200).json({
      success: true,
      message: "Supplier delete successfully!",
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to delete supplier" });
  }
};
