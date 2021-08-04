import React from 'react'
import "./Badge.scss";
import classnames from "classnames";

// classnames is function className = {classnames("a", "active": if it is true)}
// className={color ? `badge badge--${color}` : ""}

export default function Badge({color, className, onClick}) {
    return (
        <i onClick={onClick} className={classnames("badge",{[`badge--${color}`]: color}, className)}></i>
    )
}
