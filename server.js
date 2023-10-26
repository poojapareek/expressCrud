const express = require("express");
const connectDB = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const bodyParser = require('body-parser');
connectDB();

const app = express();
// const port = process.env.PORT || 5000;
const port = 5000;
app.use(bodyParser.json());
app.use("/api/contacts", require("./routes/contactrouter"));

app.listen(port, () => {
    console.log(`server running on port ${port}`);
});