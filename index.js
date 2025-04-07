const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const { connectMongoDB } = require("./connection");
const { restrictToLoggedInUserOnly, checkAuth } = require("./middlewares/auth");
const URL = require("./models/url");

const URLRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const userRoute = require("./routes/user");

const app = express();
const PORT = 8001;

connectMongoDB("mongodb://127.0.0.1:27017/shortURL")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Connection failed due to : ", err));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use('/css', express.static(path.join(__dirname, 'css')));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/url', restrictToLoggedInUserOnly, URLRoute);
app.use('/user', userRoute);
app.use('/', checkAuth, staticRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));