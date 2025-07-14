import dotenv from "dotenv"
dotenv.config()
import express from "express"
import connectDB from "./config/db.js"
import { handleError } from "./middlewares/errorhandler.js"
import userRoutes from "./routes/user.routes.js"
import ticketRoutes from "./routes/ticket.routes.js"
import noteRoutes from "./routes/note.routes.js"
import cookieParser from "cookie-parser"


const app = express()
connectDB();

app.get("/", (req, res) => {
   res.send("test success")
})
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/api/user', userRoutes)
app.use('/api/ticket',ticketRoutes)
app.use('/api/note',noteRoutes)


app.listen(process.env.PORT, () => {
   console.log("server is listening on port 3000")
})
app.use(handleError)

