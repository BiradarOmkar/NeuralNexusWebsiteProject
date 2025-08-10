import EventRegistration from "../model/UserRegistrationModel.js";

export const DeleteRegistration=async(req,res)=>{
   try{
      const id=req.params.id;
      const DeleteRegistration=await EventRegistration.findByIdAndDelete(id);
        if(!DeleteRegistration){
            return res.status(404).json({ error: 'Registration Not Found' });
         }
          res.status(200).json({ message: 'Registration Deleted Successfully' });
   }catch(err){
            console.log("Error In Deleting Registration",err);
          res.status(500).json({ error: 'Internal Server Error' });
   }
}