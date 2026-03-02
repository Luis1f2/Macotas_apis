import { Router } from "express";
import { CreatePetController } from "../controller/CreatePetController";
import { UpdatePetController } from "../controller/UpdatePetController";
import { DeletePetController } from "../controller/DeletePetController";

const router = Router();

const createController = new CreatePetController();
const updateController = new UpdatePetController();
const deleteController = new DeletePetController();

router.post("/", (req, res) => createController.handle(req, res));
router.put("/:id", (req, res) => updateController.handle(req, res));
router.delete("/:id", (req, res) => deleteController.handle(req, res));

export default router;