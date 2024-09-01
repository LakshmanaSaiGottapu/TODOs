import { useState, useMemo } from 'react'
import TaskList from './components/TaskList'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
export interface TaskType {
  id: string,
  task: string,
  status: 'todo' | 'inprogress' | 'done'
}
export interface PayLoad {
  todo: TaskType[],
  inprogress: TaskType[],
  done: TaskType[]
}
function App() {
  const [data, setData] = useState<PayLoad>({
    todo: [{id: "1", task: "clean the room", status: "todo"}],
    inprogress: [{id: "2", task: "testing AEG", status: "inprogress"}],
    done: [{id: "3", task: "house warming function", status: "done"}]
  });
  const emptyFormTask = useMemo<TaskType>(()=> {return {id:"", task:"", status:"todo"}},[]);
  const [formTask, setFormTask] = useState<TaskType>(emptyFormTask);
  
  function getDeleteTask(task:TaskType){
    return function(){
      setData(prev => {
          prev[task.status] = prev[task.status].filter(item => item.id !== task.id);
          return {...prev};
      })
    }
  }
  
  function editTask(task:TaskType){
    setData(prev => {
      const newTodos = {...prev}
      const statusArray = ["todo", "inprogress", "done"];
      statusArray.map(status => {
        for(let t of newTodos[status as "todo"|"done"|"inprogress"]){
          if(t.id == task.id){
            if(t.status !== task.status){
              newTodos[t.status] = newTodos[t.status].filter((todo) => todo.id !== t.id);
              newTodos[task.status].push(task);
            }
            else{
              t.task = task.task;
            }
            break;
          }
        } 
      })
      
      console.log('newTodos: ', newTodos);
      return newTodos;
    })
  }   
  function createTask(task: TaskType){
    setData(prev => {
        prev[task['status']].push(task);
        return {...prev};
    })
  }

  return (
    <>
      <TaskForm createTask={createTask} formTask={formTask} editTask={editTask} setFormTask={setFormTask}/>
      <div style={{display:'flex', gap:'20rem', margin:'1rem', justifyContent:'center', border:'1px solid black', padding:'1rem', marginTop:'2vh'}}>
        {Object.keys(data).map((category, index) => <TaskList key={index} category={category}>{
            data[category as keyof PayLoad].map(task => <Task key={task.id} task={task} setData={setData} deleteTask={getDeleteTask(task)} setFormTask={setFormTask}></Task>)}
        </TaskList>)}
      </div>
    </>
  )
}

export default App
