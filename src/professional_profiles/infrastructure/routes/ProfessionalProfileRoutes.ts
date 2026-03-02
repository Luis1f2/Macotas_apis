import { Router } from "express";
import { CreateProfessionalProfileController } from "../controller/CreateProfessionalProfile";
import { DeleteProfessionalProfileController } from "../controller/DeleteProfessionalProfile";

const router = Router();

const createController = new CreateProfessionalProfileController();
const deleteController = new DeleteProfessionalProfileController();

router.post("/", (req, res) => createController.handle(req, res));
router.delete("/:userId", (req, res) => deleteController.handle(req, res));

export default router;