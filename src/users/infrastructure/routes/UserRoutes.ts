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

router.post("/", controller.create);
router.post("/login", authController.login);
router.put("/:id", updateController.handle);
router.delete("/:id", deleteController.handle);

export default router;