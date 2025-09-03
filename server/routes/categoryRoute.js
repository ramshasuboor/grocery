import express from "express";
import { addCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from "../controllers/categoryController";
const router = express.Router();



const uploadPath = path.join(process.cwd(), "uploads");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error('only images are allowed'), false)
    }
}


const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
})


router.post("/add", addCategory);
router.get("/all", getAllCategory);
router.get("/show/:id", getCategory);
router.put("/update/:id",updateCategory);
router.delete("/delete/:id", deleteCategory);

export default router;
