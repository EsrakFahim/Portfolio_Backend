import { Router } from "express";
import { clientMessage } from "../controllers/Client/clientMessage.controllers.js";

const router = Router();

console.log('Client Route');

router.route("/").post(clientMessage);

export default router;