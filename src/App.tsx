import { useState, useMemo, useReducer } from 'react'
import TaskList from './components/TaskList'
import Task from './components/Task'
import TaskForm from './components/TaskForm'
import reducer from './reducer'

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
  const initialState:PayLoad = {
    todo: [{id: "1", task: "clean the room", status: "todo"}],
    inprogress: [{id: "2", task: "testing AEG", status: "inprogress"}],
    done: [{id: "3", task: "house warming function", status: "done"}]
  }
  const [data, dispatch] = useReducer(reducer,initialState);
  const emptyFormTask = useMemo<TaskType>(()=> {return {id:"", task:"", status:"todo"}},[]);
  const [formTask, setFormTask] = useState<TaskType>(emptyFormTask);

  return (
    <>
      <TaskForm dispatch={dispatch} formTask={formTask} setFormTask={setFormTask}/>
      <div style={{display:'flex', gap:'20rem', margin:'1rem', justifyContent:'center', border:'1px solid black', padding:'1rem', marginTop:'2vh'}}>
        {Object.keys(data).map((category, index) => <TaskList key={index} category={category}>{
            data[category as keyof PayLoad].map(task => <Task key={task.id} task={task} dispatch={dispatch}  setFormTask={setFormTask}></Task>)}
        </TaskList>)}
      </div>
    </>
  )
}

export default App
