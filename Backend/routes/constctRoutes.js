import express from "express"
import { contactUs, getAllContacts, getMyContacts } from "../controllers/contactus.js"
import  { adminMiddleware, authMiddleware } from "../middleware/authmiddleware.js"
  
const routes =  express.Router()

routes.post("/contactus", authMiddleware,contactUs)
routes.get("/my",authMiddleware, getMyContacts)
routes.get("/admin/contacts",authMiddleware, adminMiddleware, getAllContacts)

export default routes