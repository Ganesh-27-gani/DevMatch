import express from "express"
import { contactUs, getMyContacts } from "../controllers/contactus.js"
 
const routes =  express.Router()

routes.post("/contactus", contactUs)
routes.get("/my",getMyContacts)

export default routes