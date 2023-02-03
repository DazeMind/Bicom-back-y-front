import { restart } from "nodemon";
import {getConnection} from "./../database/database"
import { jwt } from "jsonwebtoken";
import bcrypt from "bcryptjs";


const generatorJWT = (id , name) =>{
    return new Promise( (resolve, reject) => {
        const payload = {id, name};
        jwt.sing(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        },(err,token)=>{
            if (err) {
                console.log(err)
                reject('failed to generate token')
            }
            resolve(token);
        })
    })
}

const loginUser = async (req,res) => {
    try{
        const { email, password } = req.body
        if (email == null || password == null || password == "" ) {
            res.status(400).json({message: "Bad request. please fill all field."})
        }

        const connection = await getConnection();
        const login = await connection.query("SELECT * FROM users WHERE email = ? ",email) ;
        
        const validPassword = bcrypt.compareSync(password,login[0].password )
        if (!validPassword) {
            res.status(500)
            res.send({message: "Invalid Password"});
        }
    
        res.json({login})

    }catch (error){
        res.status(500)
        res.send({message: "ERROR CONNECTING TO DATABASE"});
    }
}

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
        
            //Generar JWT
            const token = await generatorJWT(login[0].id,login[0].name)
            res.json({result, token}) 
        }catch (error){
        res.status(500)
        restart.send("ERROR CONNECTING TO DATABASE")
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