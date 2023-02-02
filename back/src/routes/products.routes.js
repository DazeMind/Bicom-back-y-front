import {Router} from "express"
import {methods  as productsController} from "../controllers/products.controller";

const router = Router();

router.get("/", productsController.getProducts);
router.get("/:id", productsController.getProduct);
router.delete("/:id", productsController.deleteProduct);
router.put("/:id", productsController.updateProduct);
router.post("/", productsController.addProduct);

export default router;