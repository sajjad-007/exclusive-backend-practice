const {databaseConnect} = require("./src/database/db")
const {app} = require("./api")
require('dotenv').config()

const database = databaseConnect;

database()?.then((req,res)=>{
    app?.listen(process.env.PORT || 5000,()=>{
        console.log("server is running on port 4000");
    })
})
