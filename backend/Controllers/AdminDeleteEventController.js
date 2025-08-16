
import event from "../model/EventModel.js";
export const deleteEvent=async(req,res)=>{
    try{
         const eventid=req.params.id;
         const deleteEvent=await event.findByIdAndDelete(eventid);
         if(!deleteEvent){
            return res.status(404).json({ error: 'Event not found' });
         }
          res.status(200).json({ message: 'Event deleted successfully' });
    }catch(e){
         console.log("Error In Deleting Event",e);
          res.status(500).json({ error: 'Internal Server Error' });
    }
}
