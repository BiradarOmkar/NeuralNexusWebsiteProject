import express from 'express';
import { Router } from 'express';

const router=Router();
import { editEvent } from '../Controllers/AdminEditEventController.js';
router.put("/editEvent/:id",editEvent);
export default router;