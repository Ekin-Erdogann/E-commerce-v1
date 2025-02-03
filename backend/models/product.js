import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    url: {
        type: String,
        required: true
    },
}, {timestamps: true}// this will automatically create a timestamp for each product
);
const Product= mongoose.model('Product', productSchema);// this will create a collection called products in the database
export default Product;