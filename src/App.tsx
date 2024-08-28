import { useState } from 'react'
import './App.css'
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
    todo: [{id: "1", task: "clean the room", status: "todo"}, {id: "2", task: "clean the adidas footwear", status: "todo"}],
    inprogress: [{id: "3", task: "testing AEG", status: "inprogress"}, {id: "4", task: "testing filter WS1 & Intune", status: "inprogress"}],
    done: [{id: "5", task: "house warming function", status: "done"}, {id: "6", task: "repair the bike", status: "done"}]
  });
  
  return (
    <>
      <TaskForm setData={setData}/>
      <div style={{display:'flex', gap:'20rem', margin:'1rem', justifyContent:'center', border:'1px solid black', padding:'1rem', marginTop:'10vh'}}>
        {Object.keys(data).map((category, index) => <TaskList key={index} category={category}>{
            data[category as keyof PayLoad].map(task => <Task key={task.id} task={task} setData={setData}></Task>)}
        </TaskList>)}
      </div>
    </>
  )
}

export default App
