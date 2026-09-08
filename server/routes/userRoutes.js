import { Router } from "express"
import { getCurrentUser, getUserStats, syncUser, updateUserProfile } from "../controllers/userControllers.js"
import { protect } from "../middleware/authMiddleware.js";



const userRouter = Router()


userRouter.get("/me", protect, getCurrentUser)
userRouter.post("/sync", syncUser)
userRouter.patch("/me", protect, updateUserProfile)
userRouter.get("/stats", protect, getUserStats)


export default userRouter
