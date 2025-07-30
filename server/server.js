import dotenv from "dotenv"
import connectDB from "./config/db.js"
import cookieParser from "cookie-parser"
import { handleError } from "./middlewares/errorhandler.js"
import cors from "cors"



dotenv.config()

import express from "express"
const app = express()
app.use(
  cors({
    origin: [process.env.LOCAL_URL, process.env.PRODUCTON_URL],
    credentials: true,
  })
);

connectDB();

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get("/", (req, res) => {
  res.send("test success")
})

app.listen(process.env.PORT, () => {
  console.log(`server is listening on port ${process.env.PORT}`)
})

import userRoutes from "./routes/user.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"
import noteRoutes from "./routes/note.routes.js"

app.use('/api/user', userRoutes)
app.use('/api/ticket', ticketRoutes)
app.use('/api/note', noteRoutes)


app.use(handleError)

