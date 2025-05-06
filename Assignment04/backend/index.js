require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/db");
const taskRouter = require("./routes/task.routes");

const app = express();
const PORT = process.env.port || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/task", taskRouter);


connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
