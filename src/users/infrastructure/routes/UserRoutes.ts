import { Router } from "express";
import { UserController } from "../controller/CreateUserController";
import { AuthController } from "../controller/AuthUserController";
import { UpdateUserController } from "../controller/UpdateUserController";
import { DeleteUserController } from "../controller/DeleteUserController";

const router = Router();
const controller = new UserController();
const authController = new AuthController();
const updateController = new UpdateUserController();
const deleteController = new DeleteUserController();

router.post("/", (req, res) => controller.create(req, res));
router.post("/login", (req, res) => authController.login(req, res));
router.put("/:id", (req, res) => updateController.handle(req, res));
router.delete("/:id", (req, res) => deleteController.handle(req, res));
export default router;