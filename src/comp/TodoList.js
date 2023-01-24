import React, { useEffect, useRef, useState } from 'react';
import { firestore } from './firebaseApp';
import './style/main.css'

export default function TodoList() {
  const [todo, setTodo] = useState([]);
  const [task, setTask] = useState("");
  const [edit, setEdit] = useState("");
  const [isEditing, setIsEditing] = useState(null);
  const addTaskR = useRef(null)

  // note: function is works for get all tasks from firebase
  const getTodo = async () => {
    const data = await firestore.collection('todo').get();

    const todoData = [];

    data.forEach((doc) => {
      const obj = {
        id: doc.id,
        task: doc.data().task,
        completed: doc.data().completed,
      };
      todoData.push(obj);
    });
    setTodo(todoData);

  };


  // note: function is works for add task
  const addTask = async () => {
    const obj = {
      task: task,
      completed: false,
    }
    if (addTaskR.current.value === '') return alert('Please enter a task');
    await firestore.collection('todo').add(obj).then(getTodo);
  }


  // note: function is works for delete task
  const deleteTask = async (id) => {
    await firestore.collection('todo').doc(id).delete().then(getTodo);
  }


  // note: function is works for edit task name
  const editTask = (id) => {
    setIsEditing(id);
  };


  // note: function is works for change task name
  const saveTask = async (id) => {
    const obj = {
      task: edit,
      completed: false,
    }
    if (obj.task === '') return alert('Please enter a task');
    await firestore.collection('todo').doc(id).update(obj).then(getTodo);
    setIsEditing(null);
  }


  // note: function is works for change completed status to true or false 
  const completeTask = async (id) => {
    const task = todo.find((item) => item.id === id);
    const obj = {
      task: task.task,
      completed: !task.completed,
    }
    await firestore.collection('todo').doc(id).update(obj).then(getTodo);
  }

  
  // note: function is works for get all tasks from firebase when the page is loaded
  useEffect(() => {
    getTodo();
  }, [])

  return (
    <div>
      <h1 id={'h1-primary'}>Todo List 2023</h1>
      <input
        type={'text'}
        placeholder={'What do you have planned'}
        onChange={(e) => setTask(e.target.value)}
        id={'addTask'}
        ref={addTaskR}
      />
      <button onClick={addTask} id={'btn-addTask'}>Add Task</button>
      <h3 id='h3-primary'>Tasks</h3>
      <ul id='ul-list'>
        {todo.map((item) => {
          return (
            <li key={item.id} className='list-primary'>
              {item.task}: {item.completed ? 'done' : 'not done'}
              <button onClick={() => deleteTask(item.id)} id={'btn-1'}>Delete</button>
              <button onClick={() => completeTask(item.id)} id={'btn-2'}>completed</button>
              {isEditing === item.id ? (
                <>
                  <input id={'input-update'}
                    placeholder={'Enter what you want to change here'}
                    type="text"
                    onChange={(e) => setEdit(e.target.value)}
                    value={edit.task}
                  />
                  <button id={'btn-save'} onClick={() => saveTask(item.id)}>Save</button>
                </>
              ) : (
                <button onClick={() => editTask(item.id)} id={'btn-3'}>Edit</button>
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}


