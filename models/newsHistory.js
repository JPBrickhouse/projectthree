const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const newsHistorySchema = new Schema({
    unitedState: { type: String, required: true },
    newsSearch: { type: String, required: true },
    user: { type: String, required: true },
    date: { type: Date, default: Date.now }
})

const NewsHistory = mongoose.model("NewsHistory", newsHistorySchema)

module.exports = NewsHistory