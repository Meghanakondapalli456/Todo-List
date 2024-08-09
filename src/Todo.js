import logo from './logo.svg';
import './App.css';
import React,{useEffect, useState} from 'react';

import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";



function Todo() 
{
  const[iscompletescreen,setIscompletescreen]=useState(false);
   const[allTodos,setTodos]=useState([]);
   const[newTitle,setNewTitle]=useState("");
   const[newDescription,setNewDescription]=useState("");
   const[completedTodos,setCompletedTodos]=useState([])
   
   const fetchData =() => {
    return { allTodos,completedTodos};
   }

   const handleFetchData = () =>{
    const data = fetchData();
    alert(JSON.stringify(data,null,2));
   }

   const handleDeleteTodo = (index) =>  {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index,1);
    
localStorage.setItem('todolist', JSON.stringify(reducedTodo));
    setTodos(reducedTodo);}
    
    const handleComplete = (index) => {
      let now =new Date();
      let dd = now.getDate();
      let mm = now.getMonth()+1;
      let yyyy = now.getFullYear();
      let h = now.getHours();
      let m = now.getMinutes();
      let s =now.getSeconds();
      let completedOn = dd +'-'+ mm +'-'+ yyyy +' at '+ h + ':'  +m+ ':'+ s;
  
      let filteredItem = {
        ...allTodos[index],
        completedOn: completedOn
      }
  
      let updatedCompletedArr = [...completedTodos];
      updatedCompletedArr.push(filteredItem);
      setCompletedTodos(updatedCompletedArr);
     }
    
   useEffect(()=>{
    fetch('https://jsonplaceholder.typicode.com/todos')
       .then(response => response.json())
        .then(json => console.log(json))
     }, []);
   
   const handleAddTodo=()=>{
    let newTodoItem = {
      title: newTitle,
      descripion: newDescription
      
    };
    
    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem('todolist', JSON.stringify(updatedTodoArr))
     
   };
   
  return (
    <div className="App">
      <h1>MY TODO LIST</h1>
      <div className="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
          <label>Title</label>
          <input type="text"  value={newTitle}  onChange={(e)=>setNewTitle(e.target.value)}placeholder="Enter your title"/>
        </div>
        <div className="todo-input-item">
          <label>Description</label>
          <input type="text"  value={newDescription}  onChange={(e)=>setNewDescription(e.target.value)} placeholder="Enter your description"/>
        </div>
        <div className="todo-input-item">
          <button type="button" onClick={handleAddTodo} className="primarybtn">Add</button>
        </div>
        </div>
      
      <div className=" button-area">
        <button className={`secondaryBtn ${iscompletescreen === false && 'active'}`}onClick={()=>setIscompletescreen(false)}>Todo</button>
        <button className={` secondaryBtn ${iscompletescreen === true && 'active'}`}onClick={()=>setIscompletescreen(true)}>Completed</button>
        <button  className= "data-button" onClick={handleFetchData}>Data</button>
      </div>
      
      
      <div className="todo-list">

        { allTodos.map((item,index)=>{
          return(
            <div className="todo-list-item" key={index}>
              <div>
                <h3>{item.title}</h3>
                <p>{item.descripion}</p>
                <p><small> Completed on : {item.completedOn }</small> </p>
                </div>
                <div>
                  <MdDelete className='icon' onClick={()=> handleDeleteTodo(index)} title='delete'/>
                  <FaCheck className='check-icon' onClick={()=> handleComplete(index)} title='complete'/>
                </div>
            </div>

          )
        })}
      </div>
      </div>
    </div>
  );
}
export default Todo;


