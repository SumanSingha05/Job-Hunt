import mongoose from "mongoose";
const uderSchema = new mongoose.Schema({
    fullname: {
        type:String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        //enums we use where we have multiple options
        enum: ['student','recruiter'],
        required: true
    },
    profile: {
        bio:{type:String},
        skills:[{type:String}],
        resume:{type:String}, //URL to resume file
        resumeOriginalName:{type:String}
    }

})

