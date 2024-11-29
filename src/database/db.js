const mongoose = require('mongoose');
require('dotenv').config()

const databaseConnect = async ()=>{
    try{
        const dbConnectAtlas = mongoose.connect(process.env.DATABASE_URL)
        if (dbConnectAtlas) {
            console.log("Data base connection successful");
        }
    }catch(error){
        console.log("Error from data base connection",error);
    }
}

module.exports = {databaseConnect}