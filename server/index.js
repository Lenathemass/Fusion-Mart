import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db.js"
import authRoutes from "./routes/auth.js"
import productRoutes from "./routes/product.js"
import categoryRoutes from "./routes/category.js"
import orderRoutes from "./routes/order.js"
import userRoutes from "./routes/user.js"

dotenv.config()

const app=express()

const PORT=process.env.PORT || 5000;
connectDB()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use("/api/categories", categoryRoutes)
app.use("/api/orders", orderRoutes)
app.use("/api/users", userRoutes)

app.listen(PORT,()=>{
    console.log(`server running on http://localhost:${PORT}`);
    
})