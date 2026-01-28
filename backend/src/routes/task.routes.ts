import { Router } from "express";
import { TaskController } from "../controllers/TaskController";

const router = Router();
const taskController = new TaskController();

router.get("/", taskController.index.bind(taskController));
router.get("/:id", taskController.show.bind(taskController));
router.post("/", taskController.store.bind(taskController));
router.put("/:id", taskController.update.bind(taskController));
router.delete("/:id", taskController.delete.bind(taskController));

export { router as taskRoutes };
