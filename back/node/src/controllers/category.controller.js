import { restart } from "nodemon";
import {getConnection} from "./../database/database"

const getCategories = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * From categories")
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const getCategory = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM categories WHERE id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const addCategory = async (req,res) => {
    try{
        const {name, description } = req.body
        if (name == null || description == null ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        const category = {name, description }
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO categories SET ?",category)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const deleteCategory = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM categories WHERE id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const updateCategory = async (req,res) => {
    try{
        const {id} = req.params
        const {name, description } = req.body
        if ( name == null ||description == null  ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        var updated_at = new Date;
        console.log(updated_at)
        const category = {name, description, updated_at }
        const connection = await getConnection();
        const result = await connection.query("UPDATE categories SET ? WHERE id = ?",[category, id])
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

export const methods = {
    getCategories,
    getCategory,
    addCategory,
    deleteCategory,
    updateCategory,
 
}