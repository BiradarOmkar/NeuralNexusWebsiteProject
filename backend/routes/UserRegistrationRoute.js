import express from 'express'
import { UserRegister } from '../Controllers/UserRegistrationController.js';
const router= express.Router();

router.post("/userregister",UserRegister);
export default router;