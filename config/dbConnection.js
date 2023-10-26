const mongoose = require('mongoose');

const connectDB = async () => {
    try
    {
        const connectinString = await mongoose.connect(process.env.DB_CONNECTION);
        console.log(
            "Database Connection created: ",
            connectinString.connection.host,
            connectinString.connection.name,
        );
    }
    catch (err)
    {
        console.log(err);
        process.exit(1);
    }
};
module.exports = connectDB;