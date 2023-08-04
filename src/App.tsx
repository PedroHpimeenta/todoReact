import React, { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import Modal from './components/Modal';

// CSS
import styles from './App.module.css';
// Interface
import {ITask} from './interfaces/Task';

function App() {

  const [taskList,setTaskList] = useState<ITask[]>([]);
  const [taskUpdate, setTaskUpdate] = useState<ITask | null>(null) ;
  //delete
  const deleteTask = (id:number)=>{
    setTaskList(
      taskList.filter((task)=>{
        return task.id !== id;
      })
    );
  };

  const hideOrShowModal = (display : boolean) =>{
    const modal = document.querySelector("#modal")
    if(display){
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  }

   const editTask = (task:ITask) :void => {
    hideOrShowModal(true);
    setTaskUpdate(task);
   }

   const updateTask = (id:number, title:string, difficulty:number)=>{

    const updateTask: ITask = {id,title,difficulty}

    const updatedItems = taskList.map((task)=>{
      return task.id === updateTask.id ? updateTask : task
    })

    setTaskList(updatedItems);

    hideOrShowModal(false);
   }


  return (
   <div>
       <Modal children={<TaskForm btnText='Editar Tarefa' taskList={taskList} task={taskUpdate} handleUpdate={updateTask}/>}/>
       <Header/>
     <main className={styles.main}>
      <div>
        <h2>Adicione o que será feito</h2>
        <TaskForm btnText="Criar tarefas" taskList={taskList}  setTaskList={setTaskList}/>
        
      </div>
      <div>
        <h2>Suas tarefas:</h2>
        <TaskList taskList={taskList} handleDelete={deleteTask} handleEdit={editTask}/> 
      </div>
     </main>
      <Footer/>
   </div>
  );
}

export default App;
