import { Customer } from "../models/customerModel.js";

export const addCustomer = async (req, res) => {
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
    await Customer.create({
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
      .json({ success: true, message: "Customer added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Failed to add customer" });
  }
};

export const getCustomers = async (req, res) => {
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
    const customers = await Customer.paginate(query, options);
    res.status(200).json({
      success: true,
      message: "Customers fetched.",
      data: customers.docs, // Fixed: docs not doc
      pagination: {
        total: customers.totalDocs,
        limit: customers.limit,
        page: customers.page,
        pages: customers.totalPages,
        hasNextPage: customers.hasNextPage,
        hasPrevPage: customers.hasPrevPage,
        nextPage: customers.nextPage,
        prevPage: customers.prevPage,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get customers.",
    });
  }
};

export const getCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);
    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to get customer.",
    });
  }
};

// export const updateCustomer = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const {
//       name,
//       email,
//       mobile,
//       address,
//       city,
//       company,
//       opening_balance,
//       closing_balance,
//     } = req.body;

//     const customer = await Customer.findById(id);

//     // Check if customer exists
//     if (!customer) {
//       return res.status(404).json({
//         success: false,
//         message: "Customer not found",
//       });
//     }
//     const updatedCustomer = await Customer.findByIdAndUpdate(
//       id,
//       {
//         name,
//         email,
//         mobile,
//         company,
//         address,
//         city,
//         opening_balance,
//         closing_balance,
//       },
//       { new: true } // Returns the updated document
//     );

//     res.status(200).json({
//       success: true,
//       message: "Customer updated successfully",
//       data: updatedCustomer,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to update customer",
//     });
//   }
// };

export const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const updateFields = req.body;

    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      updateFields,
      { new: true } // updated document return karega
    );

    if (!updatedCustomer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      data: updatedCustomer,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update customer",
      error: error.message,
    });
  }
};


export const deleteCustomer = async (req, res) => {
  try {
    const customerId = req.params.id;
    const customer = await Customer.findById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }
    await customer.deleteOne();
    res.status(200).json({
      success: true,
      message: "Customer delete successfully!",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete customer.",
    });
  }
};
