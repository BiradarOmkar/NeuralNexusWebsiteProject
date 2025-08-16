import express from 'express'
const router=express.Router();
import { userSubscribe } from '../Controllers/userSubscribeController.js';

router.post('/subscribe',userSubscribe);
export default router;