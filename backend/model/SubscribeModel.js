import mongoose from 'mongoose'
const subscribeSchema=new mongoose.Schema({
    email:{type:String,required:true},
    date:{type:Date,required:true}
})

const subscribe=new mongoose.model("Subscribe",subscribeSchema);
export default subscribe