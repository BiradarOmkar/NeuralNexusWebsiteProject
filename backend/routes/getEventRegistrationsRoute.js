import express from 'express';
import { getEventRegistrations } from '../Controllers/getEventRegistrationsController.js';
const router=express.Router();
router.get("/event-registrations/:eventId",getEventRegistrations);
export default router;