const express = require("express");
// const path = require("path");
require("dotenv").config();
require("express-async-errors");
const connectDB = require("./db/connect");
const expensesRouter = require("./routes/expenses");
const authRouter = require("./routes/auth");
const cors = require("cors");
const notFoundMiddleware = require("./middlewares/not-found");
const errorHandlerMiddleware = require("./middlewares/error-handler");
const authenticationMiddleware = require("./middlewares/authentication");

const app = express();
app.use(express.json());
app.use(cors()); // If the server and the client hosts in different hostes we nust add cors !

//////////****For deploy****
// app.use(express.static(path.join(__dirname, "build")));

// app.get("/", (req, res) =>
//   res.sendFile(path.join(__dirname, "build", "index.html"))
// );

// app.use("/api/v1/expenses", authenticationMiddleware, expensesRouter);
app.use("/api/v1/expenses", expensesRouter);
app.use("/api/v1/auth", authRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3003;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.log({ error: err.message });
  }
};

start();
