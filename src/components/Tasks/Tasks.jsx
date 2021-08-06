import React from 'react'

import "./Tasks.scss";
import editSvg from "../../assets/img/edit.svg";

export default function Tasks({list}) {
    return (
        <div className="tasks">
            <div className="tasks__title">
                <h2>{list.name}</h2>
                <img src={editSvg} alt="edit-icon"/>
            </div>
            {list.tasks && list.tasks.map(item => (
                <div className="tasks__item">
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
            ))}
        </div>
    )
}
