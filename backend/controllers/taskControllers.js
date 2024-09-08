import Task from "../models/taskModel.js";
import List from "../models/listModel.js";
import {NotFoundError} from "../errors/index.js";

const getAllTasks = async (req, res) => {
    const createdBy = req.user.userId
    const tasks = await Task.find({createdBy});
    res.status(200).json({ success: true, tasks });
}

const createTask = async (req, res) => {
    const list = await List.findOne({title:req.body.listName,createdBy:req.user.userId});
    if(!list){
        await List.create({title:req.body.listName,createdBy:req.user.userId});
    }
    req.body.createdBy = req.user.userId;
    const task = await Task.create(req.body);
    res.status(201).json({
        msg: "Task Created",
        task
    })
}
const getTask = async (req, res) => {
    const _id = req.params.taskId;
    const createdBy = req.user.userId;
    const task = await Task.findOne({ _id,createdBy});
    if (task) {
        return res.status(200).json({ success: true, task });
    }
    throw new NotFoundError(`No Task with Id ${_id}`)
}


const editTask = async (req, res) => {
    const _id = req.params.taskId;
    const createdBy = req.user.userId;
    const task = await Task.findOneAndUpdate({ _id,createdBy }, req.body, {
        runValidators: true,
        new: true

    })
    if (task) {
        return res.status(200).json({ success: true, task })
    }
    throw new NotFoundError(`No Task with Id ${_id}`)
}

const deleteTask = async (req, res) => {
    const _id = req.params.taskId;
    const createdBy = req.user.userId;
    const task = await Task.findOneAndDelete({ _id, createdBy });
    if (task) {
        return res.status(200).json({ success: true, task });
    }
    throw new NotFoundError(`No Task with Id ${_id}`)
}



export { getAllTasks, getTask, editTask, createTask, deleteTask };