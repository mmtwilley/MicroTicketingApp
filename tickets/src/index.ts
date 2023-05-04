import {app} from './app';
import mongoose from "mongoose";
import { natsWrapper } from './nats-wrapper';


const start = async() => {
    if (!process.env.JWT_KEY){
        throw new Error("Environment Variable JWT_KEY not defined");
     }

    if(!process.env.MONGO_URI){
        throw new Error('MONGO_URI must be defined!')
    }

    await natsWrapper.connect('ticketing', 'laskjf', 'http://nats-srv:4222');

    natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());
    
    try{
        await mongoose.connect(process.env.MONGO_URI,{});
        console.log('Connected to MongoDb')
    } catch(err){
        console.error(err);
    }
    app.listen(3000,()=>{
        console.log('Listening on port 3000!');
    });
};


start();