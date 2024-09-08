import Task from './Task';
import "./list.css"
import { useState } from 'react';
export default function List({ lists, tasks, deleteList, activeTask, setActiveList}) {
  const [sort,setSort] = useState(true);
  const [sortMenu, setSortMenu] = useState(false);


    function delList(listId){
      deleteList(listId);
    }


    return (
      <div className='lists-container'>
        {lists.map((list) => {
          const listTasks = tasks.filter((task) => { return task.listName === list.title })
          return (
            <div className='list' key={list._id} onDragEnter={()=>{setActiveList(list)}}>
              <div className='list-header'>
              <h3 className='list-title'>{list.title}</h3>
              <div className='list-btns'>
              <button className='list-button delete-button' onClick={()=>{delList(list._id)}}><i className="fa-solid fa-trash-can fa-lg"></i></button>
              </div>
              </div>
              <div className='tasks-container'>
              <Task tasks={listTasks} listName={list.title}/> 
              </div>
            </div>
          )
        })}
      </div>
    )
  }