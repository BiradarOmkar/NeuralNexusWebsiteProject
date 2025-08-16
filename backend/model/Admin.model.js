import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    }
});


const adminCredentials=mongoose.model('Admin',adminSchema);
export default adminCredentials;
