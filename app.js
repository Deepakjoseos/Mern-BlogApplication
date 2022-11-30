import express from "express";
import mongoose from "mongoose";
import blogRouter from "./routes/blog-routes";
import router from "./routes/user-routes";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json({limit: "30mb", extended:true}))
app.use(express.urlencoded({limit: "30mb", extended:true}))

app.use("/api/user", router);
app.use("/api/blog", blogRouter);

app.get('/',(req,res,next)=>{
  res.send("<h1>Welcome to Blog Server</h1>");
})

const DATABASE_URL = process.env.CONNECTION_URL


mongoose
  .connect(
    DATABASE_URL, { useNewUrlParser:true , useUnifiedTopology:true }
  )
  .then(() => app.listen(port))
  .then(() =>
    console.log(`Connected TO Database and Listening TO Server ${port}`)
  )
  .catch((err) => console.log(err));
