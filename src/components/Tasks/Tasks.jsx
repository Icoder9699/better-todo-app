import React from 'react'
import axios from 'axios';

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";
import AddTasksForm from './AddTasksForm/AddTasksForm';
import Task from './Task/Task';

export default function Tasks({list, onEditTitle, addTask, withoutEmpty, removeTask, editTask, checkTask}) {

    const editTitle = (id, title) => {
        const newTitle = window.prompt("Название списка", title);
        if(newTitle){
            axios.patch("http://localhost:3001/lists/" + id, {
                name: newTitle
            }).catch(() => {
                alert("Не удалось обновить название списка")
            })
            onEditTitle(id, newTitle)
        }
    }

    const onRemove = (id, listId) => {
        axios.delete("http://localhost:3001/tasks/" + id)
        .then(({data}) => {

        })
        .catch(() => alert("Не удалось удалить задачу..."))
        removeTask(id, listId)
    }

    return (
        <div className="tasks">
            <div className="tasks__title">
                <h2 style={{color: `${list.color.hex}`}}>{list.name}</h2>
                <img 
                    onClick={() => editTitle(list.id, list.name)}
                    src={editSvg} 
                    alt="edit-icon"
                />
            </div>
            {!withoutEmpty && list.tasks && !list.tasks.length && <h3>Задачи отсутствуют</h3>}
            { list.tasks && list.tasks.map((task, index) => (
                <Task 
                    {...task} 
                    key={task.id + index} 
                    onRemove={onRemove} 
                    list={list}
                    editTask={editTask}
                    checkTask={checkTask}
                />
            ))}
            <AddTasksForm key={list.id} addTask={addTask} list={list} />    
        </div>
    )
}
