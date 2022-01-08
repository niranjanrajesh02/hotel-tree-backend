const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv/config')


const app = express();



//adds ability to read incoming JSON body objects
app.use(express.json());
//CORS Policy
app.use(cors());


app.get("/", (req, res) => {
  res.send("Hotel-Tree-Backend")
})

// ROUTES
const hotelsRoute = require("./routes/hotels");
app.use('/hotels', hotelsRoute)

const roomsRoute = require("./routes/rooms");
app.use('/rooms', roomsRoute)

const userRoute = require("./routes/user");
app.use('/user', userRoute)


mongoose.connect(process.env.DB_CONNECTION_URI, { family: 4 }, () => {
  console.log("Connected to the DB");
})

app.listen(4000, () => console.log("Server running!"));