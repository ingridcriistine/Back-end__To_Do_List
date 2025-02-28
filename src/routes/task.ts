import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';
import TaskController from '../controllers/TaskController.ts';
const router: Router = express.Router();

router.get("/task", TaskController.getTasks);
router.post("/task", TaskController.createTask);
router.put("/task/:id", TaskController.updateTask);
router.delete("/task/:id", TaskController.deleteTask);

export default router;