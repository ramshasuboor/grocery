import { Category } from "../models/categoryModel"

export const addCategory = async (req, res) => {
    try {
        const {
            category_name,
           
            description
        } = req.body
         const  category_image = req.file ? req.file.filename : null

        const newCategory = await Category.create({
            category_name,
            category_image,
            description
        })
        res.status(201).json({
            success: true,
            message: "Category add Successfully",
            data: newCategory
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add Category.",
        });
    }
}

// get all category

export const getAllCategory = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(201).json({
            success: true,
            data: categories
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Category not found",
        });
    }
}

// get single category

export const getCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId)
        res.status(200).json({
            success: true,
            category,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to get category.",
        });
    }
}

// update category

export const updateCategory = async(req,res)=>{
      try {
        const existingCategory = await Category.findById(req.params.id)
        if(!existingCategory){
            return res.status(404).json({message:"category not found"});
        }
        if(req.file){
            if(existingCategory.category_image){
                 const oldImgPath = path.join( "./uploads",existingCategory.category_image)
            fs.unlink(oldImgPath,(err)=>{
                if(err) console.log("failed to delete old image:",err)
            });
            }
            req.body.image = req.file.filename;
        }

        const { id } = req.params;
        const { category_name,category_image,description } = req.body;
    
        const category = await Category.findById(id);
    
        if (!category) {
          return res.status(404).json({
            success: false,
            message: "Category not found",
          });
        }
    
        const updatedCategory = await Category.findByIdAndUpdate(
          id,
          {
            category_name,
            category_image,
            description
          },
          { new: true } // Returns the updated document
        );
    
        res.status(200).json({
          success: true,
          message: "Category updated successfully",
          data: updatedCategory,
        });
      } catch (error) {
        console.error(error);
        res.status(500).json({
          success: false,
          message: "Failed to update category",
        });
      }
}

// delete category

export const deleteCategory = async (req, res) => {
    try {
        const categoryId = req.params.id;
        const category = await Category.findById(categoryId)

        if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
     if(category.category_image){
                            const filePath = path.join( "./uploads",category_image)
                            fs.unlink(filePath,(err)=>{
                                if(err) console.log("failed to delete:",err)
                            });
                        }
    await category.deleteOne();
    res.status(200).json({
      success: true,
      message: "Category delete successfully!",
    });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to delete category.",
        });
    }
}
