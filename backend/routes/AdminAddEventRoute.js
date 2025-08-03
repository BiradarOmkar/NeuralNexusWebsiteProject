import express from 'express'
import { Router } from 'express'

const router=Router();
import {addevent} from '../Controllers/AdminAddEventController.js'

router.post("/addevent",addevent);

export default router;