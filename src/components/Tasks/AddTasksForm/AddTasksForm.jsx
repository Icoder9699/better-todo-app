import axios from 'axios';
import React, { useState } from 'react'

import addSvg from "../../../assets/img/plus.svg";

import "./AddTasksForm.scss";
export default function AddTasksForm({addTask, list}) {
    const [toggleForm, setToggleForm] = useState(true);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    const toggleFormVisible = () => {
        setToggleForm(!toggleForm)
        setInputValue("")
    }

    const onAddTask = () => {
        setLoading(true)
        if(!inputValue){
            return
        }
        const newTask = {
            "listId": list.id,
            "text": inputValue,
            "completed": false
        }

        axios.post("/tasks", newTask)
            .then(({data}) => {
                addTask(list.id, data); // добавляем дата ** как так в нем создано id
                toggleFormVisible();
            })
            .catch(() => alert("Неудалось добавить задачу"))
            .finally(() => {
               setLoading(false)
        })
    }


    return (
        <div className="tasks__add-form" >
            {toggleForm ?
                <div onClick={toggleFormVisible} className="tasks__add-task">
                    <img src={addSvg} alt="plus icon"/>
                    <span>Новая задача</span>
                </div>
             : <div className="tasks__add-block">
                    <input  
                        onChange={ e => setInputValue(e.target.value)}
                        placeholder="Текст задачи"
                        type="text" 
                        className="field" 
                    />
                    <button disabled={!inputValue.length} onClick={onAddTask} className="button">
                        {!loading ? "Добавить задачу" : "Добаваление..."}
                    </button>
                    <button className="button button--grey" onClick={toggleFormVisible}>
                        Отмена
                    </button>
                </div>
            }
        </div>
    )
}
