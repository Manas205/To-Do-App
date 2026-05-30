const cookieParser = require("cookie-parser");
const cors = require("cors");
const createTask=require('./Controllers/tasksControllers')
const updatTask=require('./Controllers/tasksControllers')
const deleteTask=require('./Controllers/tasksControllers')
const getAllTask=require('./Controllers/tasksControllers')
require('dotenv').config()
const connectDB=require('./db/index')
const express = require('express')
const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(cors({
  origin: "http://localhost:3000",
   sameSite: "lax",
  credentials: true
}));

const port=process.env.PORT || 8000


const taskRoutes=require('./routes/tasksRoutes')
const userRoutes=require('./routes/userRoutes')
const aiRoutes=require('./routes/aiRoutes.js')
app.use('/api/tasks',taskRoutes)
app.use('/api/auth',userRoutes)
app.use("/api/ai",aiRoutes)

connectDB()
.then(()=>
{
  app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  })
}
)
app.use((req, res) => {
  console.log("Unmatched route:", req.method, req.url)
  res.status(404).send("Route not found")
})


