import { create } from "zustand";

export const useProductStore = create((set) => ({
    products: [],// this will hold the products array
    setProducts: (products)=> set({products}),// this will set the products array
    createProduct: async (newProduct) => {
        if(!newProduct.name || !newProduct.price || !newProduct.url) {
            return {success:false, message: "Please fill all fields"};

        }
        const response= await fetch("api/products", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",// this will tell the server that the data is in json format
            },
            body: JSON.stringify(newProduct),// this will convert the newProduct object to a json string
        });
        const data = await response.json();// this will convert the response to a json object
        set((state)=>({products:[...state.products,data.data]})); // this will add the new product to the products array
        return {success:true, message: "Product created"};
    },
    fetchProducts: async()=>{
        const response = await fetch("/api/products");
        const data = await response.json();
        set({products:data.data});
    },
    deleteProduct: async (id) => {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        if(!data.success ){
            return {success:false, message: data.message};
        }
        if (data.success) {
            set((state) => ({
                products: state.products.filter((product) => product._id !== id),
            }));
            return { success: true, message: data.message };
        }
    },
    updateProduct: async(id , updatedProduct)=>{
        if(!updatedProduct.name || !updatedProduct.price || !updatedProduct.url) {
            return {success:false, message: "Please fill all fields"};

        }
        const response = await fetch(`/api/products/${id}`, {
            method: "PUT",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify(updatedProduct),
        });
        const data = await response.json();// this will convert the response to a json object
        //update immediately
        set((state)=>({products: state.products.map( product => product._id === id ? data.data : product)})); // this will update the product in the products array
        return {success:true, message: "Product updated"};
    }
    }
    )); // this will create a store that will hold the products and a method to set the products