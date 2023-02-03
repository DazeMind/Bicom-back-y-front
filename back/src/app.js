import express  from "express";
import morgan from "morgan";
import cors from "cors";
//route
import productsRoutes from "./routes/products.routes"
import categoriesRoute from "./routes/category.routes"
import usersRoute from "./routes/users.routes"


const app = express()

//setting
app.set("port",5000)

//middleware
app.use(morgan("dev"))
app.use(express.json())
app.use(cors())

//routes
app.use("/api/products", productsRoutes)
app.use("/api/categories", categoriesRoute)
app.use("/api/users", usersRoute)

export default app