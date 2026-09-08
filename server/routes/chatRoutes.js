import { Router } from "express";
import { streamChat } from "../controllers/chatControllers.js";
import { protect } from "../middleware/authMiddleware.js";




const chatRouter = Router();


chatRouter.use(protect)



chatRouter.post("/", streamChat);

export default chatRouter;