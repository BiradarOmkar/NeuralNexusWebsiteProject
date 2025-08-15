import express from 'express'
import { Router } from 'express'
import {addevent} from '../Controllers/AdminAddEventController.js'
import { deleteEvent } from '../Controllers/AdminDeleteEventController.js';
import { DeleteRegistration } from '../Controllers/AdminDeleteRegistrationController.js';
import { editEvent } from '../Controllers/AdminEditEventController.js';
import { getEvents } from '../Controllers/AdminViewEventController.js';
import { geteventById } from '../Controllers/AdminViewSingleEvent.js';
import adminLogin from '../Controllers/adminLogin.js';
import adminCredentials from '../model/Admin.model.js';
const router=Router();

router.post("/addevent",addevent);


router.delete("/deleteEvent/:id",deleteEvent);

router.delete("/deleteregistration/:id",DeleteRegistration);

router.put("/editEvent/:id",editEvent);

router.get("/getevents",getEvents);

router.get("/getevents-id/:id",geteventById);

router.post('/create',async (req,res) => {
    const {email,password}=req.body
    const adminU=new adminCredentials({
        email,password
    })
    
    await adminU.save()

    res.status(200).json({success:'true',password:password,email:email})
})
router.get('/all', async (req, res) => {
    try {
        const adminU = await adminCredentials.find(); // Await the query
        res.status(200).json(adminU); // Send actual data
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/admin',adminLogin)

export default router;