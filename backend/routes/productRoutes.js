import express from "express";

import { getProducts ,createProduct,deleteProduct, updateProduct} from "../controllers/productController.js";
const router = express.Router(); // this will create a router object that we can use to create routes

router.put("/:id", updateProduct);
router.get("/", getProducts);

router.post("/", createProduct);

router.delete("/:id", deleteProduct);
export default router;
