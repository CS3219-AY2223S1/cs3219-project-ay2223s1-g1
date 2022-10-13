import UserModel from './user-model.js';
import BlacklistModel from './blacklist-model.js';
import * as dotenv from 'dotenv';
dotenv.config({path:'./../.env'})

//Set up mongoose connection
import mongoose from 'mongoose';

let mongoDB = process.env.ENV == "PROD" ? process.env.DB_CLOUD_URI : process.env.DB_LOCAL_URI;
mongoose.connect(mongoDB, { useNewUrlParser: true , useUnifiedTopology: true});


let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

export async function createUser(params) { 
  return new UserModel(params)
}
export async function findUserbyUsername(params) {
  return UserModel.find(params)
}
export async function findOneUser(params) {
  return UserModel.findOne(params)
}

export async function createBlackList(params) { 
  return new BlacklistModel(params)
}

export async function checkBlackList(token) { 
  return db.collection("blacklistmodels")
  .countDocuments({ token: token }, { limit: 1 }) 
  .then(num => {
    if (num > 0) {
      return true;
    }  
    return false;
  });
}
