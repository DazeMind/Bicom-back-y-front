import { restart } from "nodemon";
import {getConnection} from "./../database/database"
import { jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";

const TOKEN_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywiZW1haWwiOiJhZG1pbkBkYW5ueS5jbCJ9.bjRmsnvMt1Luvg4dH-qFcsRS8tnu7pkt7tiOIvwK4nk";

// const verifyToken = (req, res, next) => {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split('')[1];
//     console.log(authHeader);
//     if (token==null) 
//         return res.status(401).send("Token Required");
//     jwt.verify(token, TOKEN_KEY, (err, user)=>{
//         if (err) return res.status(403).send("Invalid token");
//         console.log(user);
//         req.user = user;
//         next();
//     });
// }


const getUsers = async (req, res)=>{
    try{
        const connection = await getConnection();
        const result = await connection.query("SELECT * From users")
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const getUser = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("SELECT * FROM users WHERE id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const registerUser = async (req,res) => {
    try{
        const {name, email, password } = req.body
        
        if (name == null || email == null || password == null ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        const user = {name, email, password }
        //HASH PASS
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password,salt);
        //INSERT INTO
        const connection = await getConnection();
        const result = await connection.query("INSERT INTO users SET ?", user);
        
        res.send(result)
    }catch (error){
        res.status(500)
        restart.send("INTERNAL SERVER ERROR")
    }
}

const loginUser = async (req,res) => {
    try{
        const { email, password } = req.body
        if (email == null || password == null || password == "" ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }

        const connection = await getConnection();
        const login = await connection.query("SELECT * FROM users WHERE email = ? ",email) ;
        const passwordHashed =  await connection.query("SELECT password FROM users WHERE email = ? ",email)

        res.json({login, passwordHashed})

    }catch (error){
        res.status(500)
        res.send({message: "INTERNAL SERVER ERROR"});
    }
}

const deleteUser = async (req,res) => {
    try{
        const {id} = req.params
        const connection = await getConnection();
        const result = await connection.query("DELETE FROM users WHERE id = ?",id)
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

const updateUser = async (req,res) => {
    try{
        const {id} = req.params
        const {name, email, password } = req.body
        if ( name == null ||email == null || password == null ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }
        var updated_at = new Date;
        console.log(updated_at)
        const user = {name, email, password }
        const connection = await getConnection();
        const result = await connection.query("UPDATE users SET ? WHERE id = ?",[user, id])
        res.json(result)
    }catch (error){
        res.status(500)
        restart.send(error.message)
    }
}

export const methods = {
    getUsers,
    getUser,
    registerUser,
    deleteUser,
    updateUser,
    loginUser,
}