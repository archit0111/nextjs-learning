import mongoose from "mongoose";
 

export async function connectDB(){
    if(mongoose.connection.readyState==1){
        console.log("Database already connected!");
        return;
    }
    try{
        await mongoose.connect(process.env.DATABASE!);
        console.log("DATABASE CONNECTED!");
    }catch(e){
        console.log(`Error occered in connecting database: ${e}`);
    }
}