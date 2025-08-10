import express from 'express';
import { Router } from 'express';

import { deleteEvent } from '../Controllers/AdminDeleteEventController.js';
const router=Router();

router.delete("/deleteEvent/:id",deleteEvent);

export default router;