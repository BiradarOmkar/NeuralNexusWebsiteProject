import express from 'express';
import { Router } from 'express';
import { getEvents } from '../Controllers/AdminViewEventController.js';
const router=Router();

router.get("/getevents",getEvents);

export default router;