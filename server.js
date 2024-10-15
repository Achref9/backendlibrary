const express = require("express");
const app = express();
const cors = require("cors");
const port = 5000;
const mongoose = require("mongoose");

require('dotenv').config()


mongoose.connect(process.env.DATABASE_URL, {} );
const db = mongoose.connection;

db.on('error', (error) => console.log(error))
db.once('open', () => console.log('Connected to MongoDB'))

app.use(express.json())



const bookrouter = require("./routes/books.js")
app.use("/books", bookrouter)


app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
console.log('Connecting to:', process.env.DATABASE_URL);
module.exports = app;
