import express from "express";
import { config } from "dotenv";
import { connect } from "mongoose";
import registerRouter from './routes/register.js'
import userRouter from './routes/book.js'
import staffRouter from './routes/user.js'
import serviceRouter from './routes/service.js'

const app = express();
config({path:".env"})
app.use(express.json())
app.use(express.urlencoded({extended:true}))
// This is home route
app.get("/", (req, res) => {
  res.json({ message: "This is Home Section" });
});

// User register karna hai

app.use('/user/api/register', registerRouter)

// craete booking  User 
app.use('/booking/api/user', userRouter)

// Create Staff User Data
app.use('/api/user', staffRouter)



// Service create post
app.use('/service/api',serviceRouter)

// MongoDB  ko connect karna
connect(
  process.env.MONGO_URL,
  {
    dbName: "Booking_API",
  }
)
  .then(() => console.log("MonogoDB is connected...!"))
  .catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`Server is runing on port = ${port}`));
