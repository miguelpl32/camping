const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const Campground = require("./models/campground");

mongoose.connect("mongodb://localhost:27017/yelp-camp", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

//conexion a Mongo
const db = mongoose.connection;
db.on("error", console.error.bind(console, "error de conexion"));
db.once("open", () => {
    console.log("Conectado a la DB");
});

const app = express();

app.set("views", path.join(__dirname, "views"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/makecamping", async (req, res) => {
    const camp = new Campground({
        title: "My Camping",
        description: "Camping Barato",
    });
    await camp.save();
    res.send(camp);
});

app.listen(3000, () => {
    console.log("APP EN EL PUERTO 3000!");
});
