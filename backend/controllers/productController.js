import Product from "../models/product.js";
import mongoose from "mongoose";
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}); // this will return all the products
    res.status(200).json({ success: true, data: products });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}
export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.url) {
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });
    }
    const newProduct = new Product(product);
    try {
      await newProduct.save();
      res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }
  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid id" });
    }
    try {
      await Product.findByIdAndDelete(id); // this will find the product by id and delete it
      res.json({ success: true, message: "Product deleted" });
    } catch (error) {
      res.status(500).json({ success: false, message: "Inteernal Server Error" });
    }
  }

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const product = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ success: false, message: "Invalid id" });
    } // this will check if the id is a valid mongo id
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, product, {
        new: true,
      }); // this will find the product by id and update it with the new product
      res.status(200).json({ success: true, data: updatedProduct });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  }