const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const Inventory = require("./model/inventory");
require("dotenv").config();
const methodOverride = require("method-override");

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

mongoose
  .connect(process.env.DB_LINK, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", async (req, res) => {
  const lists = await Inventory.find({});
  res.render("index", { lists });
});

app.post("/create", async (req, res) => {
  const addItem = new Inventory(req.body);
  await addItem.save();
  res.redirect("/");
});

app.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updateItem = await Inventory.findByIdAndUpdate(id, req.body, {
    runValidators: true,
    new: true,
  });
  res.redirect("/");
});

app.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteItem = await Inventory.findByIdAndDelete(id);
  res.redirect("/");
});

app.listen(process.env.PORT, console.log("Server is connected"));
