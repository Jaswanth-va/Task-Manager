import {useState} from "react";
import "./createlist.css";
import LogoutButton from "./LogoutButton";

export default function CreateList({ createNewList }) {
    const [title, setTitle] = useState("");
    function handleInput(e) {
      setTitle(e.target.value)
    }
    function handleClick() {
      if (title.length > 0)
        createNewList({ "title": title })
      setTitle("");
    }


    return (
      <div className="header">
      <div className="create-list">
        <form >
          <input  className="list-input" type="text" value={title} onChange={handleInput} placeholder='Enter list title' />
        </form>
        <button className="create-list-button" onClick={handleClick}><i className="fa-solid fa-plus fa-lg"></i> Create list</button>
      </div>
        <LogoutButton/>
      </div>
    )
  }