import classNames from 'classnames';
import React from 'react'
import Badge from '../Badge/Badge';

import "./List.scss";

import removeSvg from "../../assets/img/remove.svg";
import axios from 'axios';

export default function List({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) {

    const removeItem = (id) => {
        if(window.confirm(`Вы действительно хотите удалить список ?`)){
            axios.delete("http://localhost:3001/lists/" + id).then(() => {
                onRemove(id)
            })
        }
    }

    return (
        <ul className="list" onClick={onClick} >
            {items && items.map((item, index) => {
            return  (
                <li 
                    onClick={onClickItem ? () => onClickItem(item) : null}
                    className={classNames(item.className, {"active" : item.active ? "active" : activeItem && activeItem.id === item.id})} 
                    key={index} 
                >
                    <i>
                        {item.icon ? item.icon : (
                            <Badge color={item.color.name} />
                        )}
                    </i>
                    <span>
                        {item.name} {item.tasks && ` (${item.tasks.length})`}
                    </span>
                    {isRemovable && (
                        <img
                            onClick={() => removeItem(item.id)}
                            className="list__remove" 
                            src={removeSvg} 
                            alt="remove-icon"
                        />
                    )}
                </li>
            )
            })}
        </ul>
    )
}
