import React from 'react'
import axios from 'axios';

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddTasksForm from './AddTasksForm/AddTasksForm';

export default function Tasks({list, onEditTitle, addTask}) {

    const editTitle = (id, title) => {
        const newTitle = window.prompt("Название списка", title);
        if(newTitle){
            onEditTitle(id, newTitle)
            axios.patch("http://localhost:3001/lists/" + id, {
                name: newTitle
            }).catch(() => {
                alert("Не удалось обновить название списка")
            })
        }
    }

    return (
        <div className="tasks">
            <div className="tasks__title">
                <h2>{list.name}</h2>
                <img 
                    onClick={() => editTitle(list.id, list.name)}
                    src={editSvg} 
                    alt="edit-icon"
                />
            </div>
            { list.tasks.length ? list.tasks.map(item => (
                <div key={item.id} className="tasks__item">
                    <div className="checked">
                        <input id={`task_${item.id}`} type="checkbox"/>
                        <label htmlFor={`task_${item.id}`}>
                            <svg
                                width="11"
                                height="8"
                                viewBox="0 0 11 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M9.29999 1.20001L3.79999 6.70001L1.29999 4.20001"
                                    stroke="#fff"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        </label>
                    </div>
                    <input value={item.text} readOnly />
                </div>
            ))
            : <h3>Задачи отсутствуют</h3>
            }
            <AddTasksForm addTask={addTask} list={list} />    
        </div>
    )
}
