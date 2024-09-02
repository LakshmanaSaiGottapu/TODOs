import { TaskType } from "../App";
import { Action } from "../reducer";

function Task({task, dispatch, setFormTask}:{task:TaskType, dispatch:React.Dispatch<Action>, setFormTask:React.Dispatch<React.SetStateAction<TaskType>>}){
    function handleDone(){
        dispatch({type:'done', task})
    }
    function handleDelete(){
        dispatch({type:'delete', task})
    }
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'0.2rem'}}>
            <div><p>{task.status.toLocaleUpperCase()}</p></div>
            <input value={task.task} readOnly style={{backgroundColor:'lightgray'}}/>
            <div style={{display:'flex'}}>
                <button onClick={()=>setFormTask(task)}>edit</button>
                <button onClick={handleDone}>done</button>
                <button onClick={handleDelete}>delete</button>
            </div>            
        </div>
    )
}

export default Task;