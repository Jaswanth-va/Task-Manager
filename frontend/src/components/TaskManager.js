import { useEffect, useState, createContext } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";
import List from './List.js';
import CreateList from './CreateList.js';
import TaskViewer from "./TaskViewer.js";
import "./taskmanager.css";



const UserContext = createContext()

export default function TaskManager() {
    const [lists, setLists] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [taskViewer, setTaskViewer] = useState({});
    const [activeTask, setActiveTask] = useState(null);
    const [activeList, setActiveList] = useState(null);
    
    const token = localStorage.getItem("token") || document.cookie.slice(6);
    console.log(token);
    async function getAllTasks() {
      try {
        const { data: { lists } } = await axios.get("http://localhost:5000/api/v1/lists", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const { data: { tasks } } = await axios.get("http://localhost:5000/api/v1/tasks", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setLists(lists);
        setTasks(tasks);
      } catch (error) {
        console.log(error.response.data.msg);        
      }
    }
  
    async function createNewTask(newTask) {
      try {
        const { data: { task } } = await axios.post("http://localhost:5000/api/v1/tasks", newTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllTasks();
      } catch (error) {
        console.log(error);
        window.alert(error.response.data.msg)
      }
    }
  
    async function createNewList(newList) {
      try {
        const { data: { list } } = await axios.post("http://localhost:5000/api/v1/lists", newList, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllTasks();
      } catch (error) {
        window.alert(error.response.data.msg)
      }
    }
  
    async function deleteTask(taskId){
      try {
        const { data: { task } } = await axios.delete(`http://localhost:5000/api/v1/tasks/${taskId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllTasks();
      } catch (error) {
        window.alert(error.response.data.msg)
      }
    }
  
    async function deleteList(listId){
      try {
        const { data: { list } } = await axios.delete(`http://localhost:5000/api/v1/lists/${listId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllTasks();
      } catch (error) {
        window.alert(error.response.data.msg)
      }
    }
  
    async function editTask(taskId,newTask){
      try {
        const { data: { task } } = await axios.patch(`http://localhost:5000/api/v1/tasks/${taskId}`,newTask, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        getAllTasks();
      } catch (error) {
        window.alert(error.response.data.msg)
      }
    }
  
    function drop(){
      const updatedtask = {"listName":activeList.title};      
      editTask(activeTask,updatedtask);
    }
    useEffect(() => {
      getAllTasks();
    }, [])
  
  
  
    return (
        <>
        
      <div className="task-manager">
        <UserContext.Provider value={{createNewTask,deleteTask, setTaskViewer, setActiveTask, drop}}>
        <CreateList createNewList={createNewList} />
        <List lists={lists} tasks={tasks} deleteList={deleteList} activeTask={activeTask} setActiveList={setActiveList}/>
        </UserContext.Provider>
      </div>
        <TaskViewer task={taskViewer} editTask={editTask} cancelView={setTaskViewer}/>
        </>
    )
  }

  export {UserContext};