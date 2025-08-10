import express from 'express';
import { Router } from 'express';
import {geteventById} from '../Controllers/AdminViewSingleEvent.js';
const router=Router();
router.get("/getevents-id/:id",geteventById);

export default router;