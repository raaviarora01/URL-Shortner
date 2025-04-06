const express = require("express");
const path = require("path");
const { connectMongoDB } = require("./connection");
const URLRoute = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const URL = require("./models/url");

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

app.use('/url', URLRoute);
app.use('/', staticRoute);

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));