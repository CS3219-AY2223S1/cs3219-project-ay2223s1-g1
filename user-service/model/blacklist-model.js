import mongoose from 'mongoose';
var Schema = mongoose.Schema
let BlacklistModelSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    },
    createdAt: {
        type: Date,
        expires: 600, 
        required: true,
    }
})

export default mongoose.model('blacklistModel', BlacklistModelSchema)