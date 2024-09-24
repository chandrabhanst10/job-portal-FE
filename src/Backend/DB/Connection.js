import mongoose from "mongoose";

mongoose.connect("mongodb+srv://chandrabhan:chandrabhan@jobportalcluster.dk41j.mongodb.net/",{
    dbName:"Job_portal",

}).then(()=>{
    console.log("Database connected");
}).catch((error)=>{
    console.log(error);
})