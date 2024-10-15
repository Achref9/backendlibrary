const mongoose = require("mongoose");
const Schema = mongoose.Schema(
    {
        title: { type: String, required: true },
        author: { type: String, required: true },
        description: { type: String, required: true },
        publishedDate: { type: Date },
        genre: { type: String },
        pages: { type: Number }
})

const book = mongoose.model('book', Schema);
module.exports = book