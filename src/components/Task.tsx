import { useRef, useState } from "react";
import { TaskType, PayLoad } from "../App";

function Task({task, setData, deleteTask, editTask}:{task:TaskType, setData:React.Dispatch<React.SetStateAction<PayLoad>>, deleteTask:()=>void, editTask:(newTask: string) => void }){
    const inputRef = useRef<HTMLInputElement>(null);
    const [editFlag, setEditFlag] = useState<boolean>(false);
    function handleDone(){
        if(task.status   !== 'done')
        setData(prev => {
            const filteredTodos = prev[task.status].filter(item => item.id !== task.id);
            prev[task.status] = filteredTodos;
            task.status = 'done'
            prev['done'].push(task);
            return {...prev};
        })
    }
    function handleEdit(){
        if(editFlag && inputRef.current && inputRef.current.value !== task.task){
            const newTask = inputRef.current.value;
            editTask(newTask);
        } 
        setEditFlag(prev => !prev);
    }
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'0.2rem'}}>
            <div><p>{task.status.toLocaleUpperCase()}</p></div>
            <input ref={inputRef} defaultValue={task.task} readOnly={!editFlag} style={{backgroundColor:!editFlag?'white':'lightgray'}}/>
            <div style={{display:'flex'}}>
                <button onClick={handleEdit}>{editFlag?"save":"edit"}</button>
                <button onClick={handleDone}>done</button>
                <button onClick={()=>deleteTask()}>delete</button>
            </div>
        </div>
    )
}

export default Task;