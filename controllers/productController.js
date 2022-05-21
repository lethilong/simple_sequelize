const db = require('../models');

//create main Model
const Product = db.products;
const Review = db.reviews;

//main work

//1. create product

const addProduct = async (req, res) => {

    try{
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch(err) {
        console.log(err);
    }
   
}

module.exports ={addProduct}