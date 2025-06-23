import { Router } from "express";
import userRouter from "./user";
import calendarRouter from "./calendar";
import eventRouter from "./event";

const router = Router();


router.use('/user', userRouter);
router.use('/calendar', calendarRouter);
router.use('/event', eventRouter);



export default router;
