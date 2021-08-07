import React, { useEffect } from 'react'
import List from '../List/List';
import PropTypes from 'prop-types'; 

import "./AddPopup.scss";
import Badge from '../Badge/Badge';
import closeBtn from "../../assets/img/close.svg";
import axios from 'axios';

export default function AddPopup({colors, onAddList}) {
    const [popup, showPopup] = React.useState(false);
    const [selectedColor, selectColor] = React.useState(3);
    const [inputValue, setInputValue] = React.useState("");
    const [isLoading, setLoading] = React.useState(false);

    useEffect(() => {
        if(Array.isArray(colors)){
            selectColor(colors[0].id)
        }
    }, [colors])

    const onClose = () => {
        showPopup(false);
        setInputValue("");
        selectColor(colors[0].id)
    }
    const onAdd = () => {
        setLoading(true);
        axios.post("http://localhost:3001/lists", {
            name: inputValue,
            colorId: selectedColor
        }).then(({data}) => {
            const colorName = colors.filter(c => c.id === selectedColor)[0].name; // {id: num, name: {}, color: name}
            const listObj = {...data, color: {name: colorName}};
            onAddList(listObj);
        }).finally(() => {
            setLoading(false);
            onClose()
        })
    }

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
                <img 
                    onClick={() => showPopup(false)} 
                    src={closeBtn} 
                    alt="close" 
                    className="add__popup-close"
                />
                <input  
                    placeholder="Название списка"
                    value={inputValue} 
                    type="text" 
                    className="field" 
                    onChange={e => setInputValue(e.target.value)}
                />
                <ul className="add__popup-colors">
                    {colors.map((color, index) => (
                        <li key={color.hex} >
                            <Badge 
                                key={color+index}
                                color={color.name} 
                                className={selectedColor === color.id ? "active" : null}
                                onClick={() => selectColor(color.id)}    
                            />
                        </li>
                    ))}
                </ul>
                <button onClick={onAdd} className="button">
                    {isLoading ? "Добавление..." : "Добавить"} 
                </button>
            </div>
            }
        </div>
    )
};


// prop-types 
AddPopup.propTypes = {
    colors: PropTypes.array,
    onAddList: PropTypes.func
}

AddPopup.defaultProps = {
    colors: [],
}