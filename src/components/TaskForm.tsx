import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TaskType } from "../App";
import { Action } from "../reducer";
function TaskForm({dispatch, formTask, setFormTask}:{dispatch:React.Dispatch<Action>, formTask:TaskType, setFormTask:React.Dispatch<React.SetStateAction<TaskType>>}){
    const formRef = useRef<HTMLFormElement>(null);
    const taskRef = useRef<HTMLInputElement>(null);
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        if(taskRef.current && taskRef.current.value!==''){
            if(taskRef.current.value.length<10) return ;
            if(formTask.id) dispatch({type:'edit', task:formTask});
            else{
                const task:TaskType = {
                    id: uuidv4(),
                    task: formTask.task,
                    status: formTask.status
                }
                dispatch({type:'create',task});
            }
        }
        resetFormTask();
    }
    function resetFormTask(){
        if(formRef.current)
            formRef.current.reset();
        setFormTask({id:"", task:"", status:"todo"});
    }
    return (
        <div style={{display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'0.25rem', marginTop:'1.5rem'}}>
            <h3>TODO Dashboard</h3>
            <form id="taskform" ref={formRef} style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.25rem', padding:'1rem'}} onSubmit={handleSubmit}>
                <div>
                    <input name="task" style={{padding:'0.5rem', margin:'0.25rem', width:'40vw', fontSize:'1rem'}} ref={taskRef} value={formTask.task} onChange={(e) => setFormTask({ ...formTask, task: e.target.value })}
                    />
                    <select name="status" id="" 
                         value={formTask.status} 
                         onChange={(e) => setFormTask({ ...formTask, status: e.target.value as "todo"|"inprogress"|"done" })}
                    >
                        <option value="todo" >todo</option>
                        <option value="inprogress">inprogress</option>
                        <option value="done">done</option>
                    </select>
                </div>
                <button style={{cursor:'pointer', padding:'0.25rem'}} type="submit">{formTask.id?"Edit Task":"Create Task"}</button>
            </form>
            <button onClick={()=>{ 
                resetFormTask();
                if(formRef.current)
                    formRef.current.reset();
            }}>clear
            </button>
        </div>
    )
}

export default TaskForm;