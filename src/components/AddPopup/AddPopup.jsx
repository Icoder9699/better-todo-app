import React from 'react'
import List from '../List/List'

import "./AddPopup.scss";
import db from "../../assets/db.json";
import Badge from '../Badge/Badge';
import closeBtn from "../../assets/img/remove.svg";

export default function AddPopup() {
    const {colors} = db;
    const [popup, showPopup] = React.useState(false);
    const [selectedColor, selectColor] = React.useState(1);

    return (
        <div>
             <List 
                onClick={() => showPopup(true)}
                items={[
                    {
                        className: "list__add-btn",
                        icon: (
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 1V11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 6H11" stroke="#868686" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        ),
                        name: "Добавить список"
                    }
                ]}
            />
            {popup && 
            <div className="add__popup">
                <button onClick={() => showPopup(false)}className="add__popup-close"><img src={closeBtn} alt="close" /></button>
                <input className="add__popup-field" />
                <ul className="add__popup-colors">
                    {colors.map((color, index) => (
                        <li key={color.hex} >
                            <Badge 
                                color={color.name} 
                                className={selectedColor === color.id ? "active" : null}
                                onClick={() => selectColor(color.id)}    
                            />
                        </li>
                    ))}
                </ul>
                <button className="add__popup-btn">
                    Добавить
                </button>
            </div>
            }
        </div>
    )
}
