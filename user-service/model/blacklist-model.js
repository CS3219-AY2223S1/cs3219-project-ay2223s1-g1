import mongoose from 'mongoose';
var Schema = mongoose.Schema
let BlacklistModelSchema = new Schema({
    token: {
        type: String,
        required: true,
        unique: true,
    }
})

export default mongoose.model('blacklistModel', BlacklistModelSchema)