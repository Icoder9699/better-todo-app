import React from 'react'

import "./List.scss";

export default function List({items}) {
    return (
        <ul className="list">
            {items.map(item => {
            return  (
                <li className={item.active}>
                    <i>
                        {item.icon ? item.icon : (
                            <i className={item.color ? `badge badge--${item.color}` : ""}>
                            </i>
                        )}
                    </i>
                    <span>
                        {item.name}
                    </span>
                </li>
            )
            })}
        </ul>
    )
}
