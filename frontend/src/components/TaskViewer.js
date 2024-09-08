import { useEffect, useState } from "react";
import "./taskviewer.css"

export default function TaskViewer({ task, editTask, cancelView }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editTitle, setEditTitle] = useState(false);
  const [editDescription, setEditDescription] = useState(false);

  function updateTask() {
    editTask(task._id, { "title": title, "description": description });
    setEditTitle(false);
    setEditDescription(false);
  }
  function close() {
    cancelView({});
    setEditTitle(false);
    setEditDescription(false);
  }
  let styles = { display: "none" }
  if (task.title) {
    styles = { display: "block" }
  }
  
  useEffect(()=>{
    setTitle(task.title);
    setDescription(task.description);    
  },[task])
  return (
    <div className="task-viewer" style={styles}>
      <div className="edit-page">
        <h5>{task.listName}</h5>
        {editTitle ?
          <div className="title-edit-box">
            <input className="text-area3" value={title} onChange={(e) => { setTitle(e.target.value) }} placeholder='Enter task title' autoFocus />
            <button className="edit-cancel" onClick={() => {setTitle(task.title) ;setEditTitle(false)}}><i class="fa-solid fa-x fa-lg"></i></button>
          </div>
          : <h2 className="task-tile-edit" onClick={() => {setDescription(task.description);setEditTitle(true) }}>{title}</h2>}


        {description ? editDescription ?
          <div className="description-edit-box">
            <textarea className="text-area2" placeholder='Description' value={description} onChange={(e) => { setDescription(e.target.value) }} autoFocus></textarea>
            <button className="edit-cancel" onClick={() => { setEditDescription(false) }}><i className="fa-solid fa-x fa-lg"></i></button>
          </div>
          : <p className="task-description-edit"onClick={() => { setEditDescription(true) }}>{description}</p>: <textarea placeholder='Description'  className="text-area2" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>}
        <div className="save-cancel-btns">
          <button className="save-button" onClick={updateTask}><i className="fa-solid fa-floppy-disk fa-lg"></i></button>
          <button className="cancel-edit-button" onClick={close}><i className="fa-solid fa-x fa-lg"></i></button>
        </div>
      </div>
    </div>
  )
}