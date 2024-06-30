const mongoose = require('mongoose');

const connectDatabase = () => {
    mongoose.connect("mongodb://localhost:27017/Ecommerce", {useNewUrlParser: true, useUnifiedTopology: true, family: 4}).then(()=>{
        // console.log(`Mongodb connected with s erver: ${data.connection.host}`);
        console.log("Mongodb connected with server");
    })
}

module.exports = connectDatabase; 