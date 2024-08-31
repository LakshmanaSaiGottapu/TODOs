import { useRef } from "react";
import { v4 as uuidv4 } from 'uuid';
import { TaskType, PayLoad } from "../App";
function TaskForm({setData}:{setData:React.Dispatch<React.SetStateAction<PayLoad>>}){
    const taskRef = useRef<HTMLInputElement>(null);
    type FormObj = Omit<TaskType,'id'>;
    function getFormData(element:HTMLFormElement):FormObj{
        const formData = new FormData(element);
        let formObj:FormObj = {task:"", status:"todo"};
        for(let entry of formData.entries()){
            if(entry[0] == "task")
                formObj[entry[0] as "task"] = entry[1] as string;
            else if(entry[0] == "status")
                formObj[entry[0] as "status"] = entry[1] as ("todo"|"inprogress"|"done");
        }
        return formObj;
    }
    function handleSubmit(e: React.FormEvent<HTMLFormElement>){
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formObject = getFormData(formElement);
        console.log(formObject);
        if(taskRef.current && taskRef.current.value!==''){
            if(taskRef.current.value.length<10){
                return ;
            }
            const task:TaskType = {
                id: uuidv4(),
                ...formObject
            }
            setData(prev => {
                prev[formObject['status']].push(task);
                return {...prev};
            })
            formElement.reset();
        }
        
    }
    return (
        <div style={{display:'flex', justifyContent:'center', padding:'0.25rem', marginTop:'1.5rem'}}>
            <h3>TODO Dashboard</h3>
            <form id="taskform" style={{display:'flex', gap:'0.25rem', padding:'1rem', position:'absolute', left:'3vw'}} onSubmit={handleSubmit}>
                <input name="task" style={{padding:'0.5rem', margin:'0.25rem', width:'40vw', fontSize:'1rem'}} ref={taskRef}/>
                <select name="status" id="">
                    <option value="todo">todo</option>
                    <option value="inprogress">inprogress</option>
                    <option value="done">done</option>
                </select>
                <button style={{cursor:'pointer', padding:'0.25rem'}} type="submit">Add Task</button>
            </form>
        </div>
    )
}

export default TaskForm;