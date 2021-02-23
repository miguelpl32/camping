const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");
require ('dotenv'). config ();

const dbUrl = process.env.DB_URL 
mongoose.connect(dbUrl, {
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

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            // Your USER ID
            author: "602aa8dfc85172174cc503f1",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            
            description:
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita facere eum quia perferendis neque a fuga, officia aut amet nam officiis, voluptatem modi temporibus tempore?",
            price,
            geometry: {
                type: "Point", 
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ] 
            },
            images: [
                {
                  
                  url: 'https://res.cloudinary.com/ds8wkqxxj/image/upload/v1613997240/YelpCamp/noche-estrellada_zjonzm.jpg',
                  filename: 'YelpCamp/gghcmzhyckbfcnewhklt'
                },
                {
                  
                  url: 'https://res.cloudinary.com/ds8wkqxxj/image/upload/v1613997159/YelpCamp/acampada_u1kguq.jpg',
                  filename: 'YelpCamp/h62myymspdzutcsxutxz'
                }
              ],
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
