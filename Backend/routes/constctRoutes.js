import express from "express"
import { contactUs, getMyContacts } from "../controllers/contactus.js"
import authMiddleware from "../middleware/authmiddleware.js"
  
const routes =  express.Router()

routes.post("/contactus", authMiddleware,contactUs)
routes.get("/my",getMyContacts)

export default routes