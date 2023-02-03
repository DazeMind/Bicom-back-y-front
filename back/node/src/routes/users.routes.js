import {Router} from "express"
import {methods  as usersController} from "../controllers/users.controllers";

const router = Router();

router.get("/", usersController.getUsers);
router.get("/:id", usersController.getUser);
router.delete("/:id", usersController.deleteUser);
router.put("/:id", usersController.updateUser);
router.post("/register", usersController.registerUser);
router.post("/login", usersController.loginUser);

export default router;