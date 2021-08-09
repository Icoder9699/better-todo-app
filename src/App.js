import './App.scss';
import axios from 'axios';
import AddPopup from './components/AddPopup/AddPopup';
import List from './components/List/List';
import React, { useState } from 'react';
import Tasks from './components/Tasks/Tasks';
import { Route, useHistory, useLocation } from 'react-router-dom';

// * до подключения json-server
// db.lists.map(list => {
  //   const colorArr = db.colors.filter(c => c.id === list.colorId);
  //   list.color = colorArr[0].name;
  //   return list
  // })

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);
  let history = useHistory();
  let location = useLocation();

  React.useEffect(() => {
    axios.get("/lists?_expand=color&_embed=tasks").then(({data}) => {
      setLists(data)
    })
    axios.get("/colors").then(({data}) => {
      setColors(data)
    })
  }, [])

  const addListHandler = obj => {
      const newLists = [
        ...lists, // {}, {}, {}
        obj       // {}
      ]
      setLists(newLists);
  }

  const removeListHandler = id => {
    // * classic method 
    // const newLists = [];
    // for(let i=0; i<lists.length; i++){
    //   if(lists[i].id === id){
    //     continue
    //   }else {
    //     newLists.push(lists[i]);
    //   }
    // }
    const newLists = lists.filter(list => list.id !== id);
    setLists(newLists)
  }

  const onEditTitleHanlder = (id, title) => {
    const newLists = lists.map(item => {
      if(item.id === id){
        item.name = title
      }
      return item;
    })
    setLists(newLists)
  }

  const addTaskHandler = (listId, obj) => {
    const newLists = lists.map(list => {
      if(list.id === listId){
        list.tasks = [...list.tasks, obj];
      }
      return list
    })
    setLists(newLists);
  }

  const removeTaskHandler = (taskId, listId) => {
    if(window.confirm("Вы точно хотите удалить эту задачу ?")){
      const newLists = lists.map(item => {
        if(item.id === listId){
          item.tasks = item.tasks.filter(task => task.id !== taskId)
        }
        return item
      })
      setLists(newLists)
    }
  }

  const editTaskHandler = (listId, taskObj) => {
    const changedTaskText = window.prompt("Измените название задачи", taskObj.text);
    const newLists = lists.map(list => {
      if(list.id === listId){
        list.tasks = list.tasks.map(task => {
          if(task.id === taskObj.id){
            task.text = changedTaskText
          }
          return task
        })
      }
      return list
    })
    axios.patch("http://localhost:3001/tasks/" + taskObj.id, {
      text: changedTaskText
    })
    .then(({data}) => {
      setLists(newLists)
    })
    .catch(() => alert("Не удалось изменить задачу..."))
  }
  
  const checkTaskHandler = (listId, taskObj) => {
    const newLists = lists.map(list => {
      if(list.id === listId){
        list.tasks = list.tasks.map(task => {
          if(task.id === taskObj.id){
            task.completed = !taskObj.completed
          }
          return task
        })
      }
      return list
    })
    axios.patch("http://localhost:3001/tasks/" + taskObj.id, {
      completed: !taskObj.completed
    })
    .then(() => {
      setLists(newLists);
    })
    .catch((e) => {
      alert("Не удалось изменить задачу...")
    })
  }

  // * working with pathes 
  React.useEffect(() => {
    const listId = history.location.pathname.split('lists/')[1];
    if (lists) {
      const list = lists.find(list => list.id === Number(listId));
      setActiveItem(list);
    } // eslint-disable-next-line
  }, [lists, location.pathname]);


  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List 
          onClickItem={() => history.push("/")}
          items={
            [
              {
                active: location.pathname === "/",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.96 8.10001H7.74001C7.24321 8.10001 7.20001 8.50231 7.20001 9.00001C7.20001 9.49771 7.24321 9.90001 7.74001 9.90001H12.96C13.4568 9.90001 13.5 9.49771 13.5 9.00001C13.5 8.50231 13.4568 8.10001 12.96 8.10001ZM14.76 12.6H7.74001C7.24321 12.6 7.20001 13.0023 7.20001 13.5C7.20001 13.9977 7.24321 14.4 7.74001 14.4H14.76C15.2568 14.4 15.3 13.9977 15.3 13.5C15.3 13.0023 15.2568 12.6 14.76 12.6ZM7.74001 5.40001H14.76C15.2568 5.40001 15.3 4.99771 15.3 4.50001C15.3 4.00231 15.2568 3.60001 14.76 3.60001H7.74001C7.24321 3.60001 7.20001 4.00231 7.20001 4.50001C7.20001 4.99771 7.24321 5.40001 7.74001 5.40001ZM4.86001 8.10001H3.24001C2.74321 8.10001 2.70001 8.50231 2.70001 9.00001C2.70001 9.49771 2.74321 9.90001 3.24001 9.90001H4.86001C5.35681 9.90001 5.40001 9.49771 5.40001 9.00001C5.40001 8.50231 5.35681 8.10001 4.86001 8.10001ZM4.86001 12.6H3.24001C2.74321 12.6 2.70001 13.0023 2.70001 13.5C2.70001 13.9977 2.74321 14.4 3.24001 14.4H4.86001C5.35681 14.4 5.40001 13.9977 5.40001 13.5C5.40001 13.0023 5.35681 12.6 4.86001 12.6ZM4.86001 3.60001H3.24001C2.74321 3.60001 2.70001 4.00231 2.70001 4.50001C2.70001 4.99771 2.74321 5.40001 3.24001 5.40001H4.86001C5.35681 5.40001 5.40001 4.99771 5.40001 4.50001C5.40001 4.00231 5.35681 3.60001 4.86001 3.60001Z" fill="#7C7C7C"/>
                  </svg>
                ),
                name: "Все задачи",
                tasks: false
              }
            ]
          }
        /> 

        <List   
          items={lists}
          isRemovable={true}
          onRemove={removeListHandler}
          onClickItem={list => {
            history.push(`/lists/${list.id}`);
          }}
          activeItem={activeItem} 
        /> 

        <AddPopup 
          colors={colors}
          onAddList={addListHandler}
        />
      </div>
      <div className="todo__tasks">
        {/* Все задачи */}
        <Route exact path="/">
          {lists && lists.map(item => (
            <Tasks 
              withoutEmpty
              key={item.id}
              list={item} 
              onEditTitle={onEditTitleHanlder} 
              addTask={addTaskHandler}
           />
          ))}
        </Route>
        {/* по выбранному задачу  */}
        <Route path="/lists/:id">
          {lists && activeItem && 
            <Tasks 
              list={activeItem} 
              onEditTitle={onEditTitleHanlder} 
              addTask={addTaskHandler}
              removeTask={removeTaskHandler}
              editTask={editTaskHandler}
              checkTask={checkTaskHandler}
            />
          }
        </Route>
      </div>
    </div>
  );
}

export default App;
