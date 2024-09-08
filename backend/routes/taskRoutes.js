import express from "express";
const router = express.Router();
import { getTask, getAllTasks, editTask, deleteTask,createTask } from "../controllers/taskControllers.js";
import { getAllLists, createList, editList, deleteList } from "../controllers/listControllers.js";

router.route("/tasks").get(getAllTasks).post(createTask);
router.route("/tasks/:taskId").get(getTask).patch(editTask).delete(deleteTask);


router.route("/lists").get(getAllLists).post(createList);
router.route("/lists/:listId").patch(editList).delete(deleteList);




export default router;