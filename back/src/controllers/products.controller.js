import { restart } from "nodemon";
import {getConnection} from "./../database/database"

const getProducts = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT products.id, products.name, products.stock , products.price, categories.name as cname,products.description,  products.created_at FROM products left join categories on categories.id = products.id_category")
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}
const getProduct = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("SELECT products.id, products.name, products.stock , products.price,  categories.name as cname,  products.description,  products.created_at,  products.updated_at FROM products LEFT JOIN categories ON categories.id = products.id_category where products.id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}
const addProduct = async (req,res) => {
    try{
        const {name, stock, price, id_category, description } = req.body
        if (name == "" || stock == "" || price == "" || id_category == ""  ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        const product = {name, stock, price, id_category, description }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO products SET ?",product)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const deleteProduct = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM products WHERE id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}
const updateProduct = async (req,res) => {
    try{
        const {id} = req.params
        const {name, stock, price, id_category, description } = req.body
        if ( name == null || stock == null || price == null || id_category == null ||description == null  ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        var updated_at = new Date;
        console.log(updated_at)
        const product = {name, stock, price, id_category, description, updated_at }
        const connection = await getConnection();
        const result = await connection.query("UPDATE products SET ? WHERE id = ?",[product, id])
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

export const methods = {
    getProducts,
    getProduct,
    addProduct,
    deleteProduct,
    updateProduct
}