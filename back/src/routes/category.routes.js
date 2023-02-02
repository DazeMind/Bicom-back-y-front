import {Router} from "express"
import {methods  as categoryController} from "../controllers/category.controller";

const router = Router();

router.get("/", categoryController.getCategories);
router.get("/:id", categoryController.getCategory);
router.delete("/:id", categoryController.deleteCategory);
router.post("/", categoryController.addCategory);
router.put("/:id", categoryController.updateCategory);

export default router;