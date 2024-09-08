import { useContext, useState } from "react";
import { UserContext } from "./TaskManager.js";
import {Fragment} from "react"
// import DropArea from "./DropArea.js";
import "./task.css"



export default function Task({ tasks,listName }) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [addTask,setAddTask] = useState(false);
    const {createNewTask, deleteTask, setTaskViewer, setActiveTask, drop} = useContext(UserContext);
    
    // const delTask = useContext(UserContext);
  
    function handleTitle(e) {
      setTitle(e.target.value)
    }
  
    function handleDescription(e) {
      setDescription(e.target.value)
    }
  
    function handleClick(e) {
      e.preventDefault();
      createNewTask({ "title": title, "listName": listName, "description": description });
      setTitle("");
      setDescription("");
      setAddTask(false);
    }
  
    function editTask(task) {
      setTaskViewer(task)
  
    }

    function delTask(taskId) {
      deleteTask(taskId);
    }


    return (
      <>
        {tasks.map((task) => {
          return (
            <div key={task._id} className='task' draggable="true" onDragStart={()=>{setActiveTask(task._id)}} onDragEnd={()=>{drop();setActiveTask(null)}}>
              <h4 className='task-title'>{task.title}</h4>
              {task.description &&<p className='task-description'>{task.description}</p>}
              <div className='task-controls'>
                {/* <p>{task.due}</p> */}
                <button onClick={()=>{editTask(task)}} className='task-button edit-button'><i className="fa-solid fa-pen fa-lg"></i></button>
                <button onClick={()=>{delTask(task._id)}} className='task-button delete-button'><i className="fa-solid fa-trash-can fa-lg"></i></button>
              </div>
            </div>
          )
        })}
        <div className="add-task">
          <form className={addTask? "task-form" :"hide-form"}>
            <input className="title-input" type="text" value={title} placeholder='Enter task title' onChange={handleTitle} />
            <textarea name="description" className="text-area" value={description} placeholder='description' onChange={handleDescription} rows="5"></textarea>
          </form>
            <div className="add-task-btns">
            {addTask && <button className="create-task-button" onClick={handleClick}>Create task</button>}
            <button className={addTask?"cancel-button" :"add-task-button"} onClick={()=>{setAddTask(!addTask)}}>{addTask? "":<i className="fa-solid fa-plus fa-lg"></i>}{addTask?<i className="fa-solid fa-x fa-lg"></i> :" Add task"}</button>
            </div>
        </div>
      </>
    )
  }