import express from 'express'
import { SaveQuery } from '../Controllers/contactController.js';
const router=express.Router();

router.post('/contact',SaveQuery);
export default router;