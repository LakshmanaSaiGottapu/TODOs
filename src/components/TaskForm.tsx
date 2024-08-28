import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TaskType, PayLoad } from "../App";
function TaskForm({setData}:{setData:React.Dispatch<React.SetStateAction<PayLoad>>}){
    const taskRef = useRef<HTMLInputElement>(null);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(taskRef.current && taskRef.current.value!==''){
            if(taskRef.current.value.length<10){

                return ;
            }
            const task:TaskType = {
                id: uuidv4(),
                task: taskRef.current.value,
                status: 'todo'
            }
            setData(prev => {
                prev['todo'].push(task);
                return {...prev};
            })
            taskRef.current.value='';
        }
        
    }
    return (
        <div style={{display:'flex', justifyContent:'center', padding:'0.25rem', marginTop:'1.5rem'}}>
            <h3>TODO Dashboard</h3>
            <form id="taskform" style={{display:'flex', padding:'1rem', position:'absolute', left:'3vw'}} onSubmit={handleSubmit}>
                <input style={{padding:'0.5rem', margin:'0.25rem', width:'40vw', fontSize:'1rem'}} ref={taskRef}/>
                <button style={{cursor:'pointer', padding:'0.25rem'}} type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default TaskForm;