import {MongoMemoryServer} from 'mongodb-memory-server';
import mongoose from 'mongoose';
import supertest from 'supertest';
import {app} from '../app';
import jwt from 'jsonwebtoken';

declare global {
    var signin: () => string[];
  }


let mongo: any; 
beforeAll(async () => {
    process.env.JWT_KEY = "asdf";

    const mongo = await MongoMemoryServer.create();
    const mongoUri = mongo.getUri();

    await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
    const collections = await mongoose.connection.db.collections();

    for(let collection of collections){
        await collection.deleteMany({});
    }
});

afterAll(async () => {
    if (mongo) {
      await mongo.stop();
    }
    await mongoose.connection.close();
});

global.signin =  () => {
    // Build a JWT payload {id,email}

    const payload = {
        id: new mongoose.Types.ObjectId().toHexString(),
        email:'testing@test.com'
    };

    // Create the JWT!
    const token = jwt.sign(payload,process.env.JWT_KEY!);

    // Build session Object, {jwt:MY_JWT}
    const session = {jwt:token};
    //Take JSON and encode into Base64
    const base64 = Buffer.from(JSON.stringify(session)).toString('base64')
    //return a string thats the cookie with the data
    return [`session=${base64}`];
}