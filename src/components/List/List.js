import classNames from 'classnames';
import React from 'react'
import Badge from '../Badge/Badge';

import "./List.scss";

import removeSvg from "../../assets/img/remove.svg";

export default function List({items, isRemovable, onClick}) {
    return (
        <ul className="list" onClick={onClick} >
            {items.map((item, index) => {
            return  (
                <li className={classNames(item.className, {"active" : item.active})} key={index} >
                    <i>
                        {item.icon ? item.icon : (
                            <Badge color={item.color} />
                        )}
                    </i>
                    <span>
                        {item.name}
                    </span>
                    {isRemovable && (
                        <img
                            className="list__remove" 
                            src={removeSvg} 
                            alt="remove"
                        />
                    )}
                </li>
            )
            })}
        </ul>
    )
}
