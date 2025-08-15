import express from 'express'
import { Router } from 'express'
import {addevent} from '../Controllers/AdminAddEventController.js'
import { deleteEvent } from '../Controllers/AdminDeleteEventController.js';
import { DeleteRegistration } from '../Controllers/AdminDeleteRegistrationController.js';
import { editEvent } from '../Controllers/AdminEditEventController.js';
import { getEvents } from '../Controllers/AdminViewEventController.js';
import { geteventById } from '../Controllers/AdminViewSingleEvent.js';


const router=Router();

router.post("/addevent",addevent);


router.delete("/deleteEvent/:id",deleteEvent);

router.delete("/deleteregistration/:id",DeleteRegistration);

router.put("/editEvent/:id",editEvent);

router.get("/getevents",getEvents);

router.get("/getevents-id/:id",geteventById);


export default router;