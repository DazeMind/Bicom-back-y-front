import { config } from "dotenv";

config()

export default {
    host: process.env.HOST || "",
    database: process.env.DATABASE || "",
    port: process.env.PORT || "",
    user: process.env.USER || "",
    password: process.env.PASSWORD || ""
}