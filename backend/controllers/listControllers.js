import List from "../models/listModel.js";
import Task from "../models/taskModel.js";
import {NotFoundError} from "../errors/index.js";

const getAllLists = async (req, res) => {
    const lists = await List.find({createdBy:req.user.userId});
    res.status(200).json({
        success: "true",
        lists
    })
}


const createList = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const list = await List.create(req.body);
    res.status(201).json({
        msg: "new list created",
        list
    })
}


const editList = async (req, res) => {
    const _id = req.params.listId;
    const createdBy = req.user.userId;
    const listName = req.body.title;
    const oldList = await List.findOne({_id,createdBy});
    const list = await List.findOneAndUpdate({ _id,createdBy }, req.body, {
        runValidators: true,
        new: true
    })
    if(list){
        await Task.updateMany({listName:oldList.title,createdBy},{listName}); 
       return  res.status(200).json({
            msg: "success",
            list
        })
    }
    throw new NotFoundError(`No list with ${_id}`)
}

const deleteList = async (req, res) => {
    const _id = req.params.listId;
    const createdBy = req.user.userId
    const list = await List.findOneAndDelete({_id,createdBy})
    if(list){
        await Task.deleteMany({listName:list.title,createdBy});
        return  res.status(200).json({msg:"List deleted"})
    }
    throw new NotFoundError(`No list with id ${_id}`)
}


export {getAllLists, editList, deleteList, createList};