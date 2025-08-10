import express from 'express';
import { DeleteRegistration } from '../Controllers/AdminDeleteRegistrationController.js';
const router=express.Router();
router.delete("/deleteregistration/:id",DeleteRegistration);
export default router;