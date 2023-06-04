const express = require("express");
const app = express();
const sequelize = require("./db/conn")
const Product = require("./db/Models/product");
const { where } = require("sequelize");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

// add products
app.post("/addProduct",async(req,res)=>{
    try {
        const {productName,productDescription,productCategory,productImage} = req.body;
        console.log({productName,productDescription,productCategory,productImage});
        const product = await Product.create({productName,productDescription,productCategory,productImage})
        res.json({product})
    } catch (error) {
        console.log(error);
        res.json(error)
    }
})

// get Products
app.get("/getProducts",async(req,res)=>{
    try {
        const products = await Product.findAll({})
        res.json({products})
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

// getOneProduct
app.get("/getProduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findOne({where:{id}});
        res.json({product})
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})


// deleteOneProduct
app.delete("/deleteProduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findOne({where:{id}});
        if (product) {
            const deleteProduct = await product.destroy();
            if (deleteProduct) {
                res.json({message:"Product has been deleted"});
            }
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

// updateProduct

app.patch("/updateProduct/:id",async(req,res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByPk(id);
        console.log(product);
        if (product) {
            const updateProduct = await product.update(req.body);
            if (updateProduct) {
                res.json({message:"Product has been updated"});
            }
        }
    } catch (error) {
        console.log(error);
        res.json(error);
    }
})

app.listen("4000",(req,res)=>{
    console.log("BackEnd Server is Running");
})