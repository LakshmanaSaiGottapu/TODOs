import { TaskType, PayLoad } from "../App";

function Task({task, deleteTask, setData, setFormTask}:{task:TaskType, deleteTask:()=>void, setData:React.Dispatch<React.SetStateAction<PayLoad>>, setFormTask:React.Dispatch<React.SetStateAction<TaskType>>}){
    // const [editFlag, setEditFlag] = useState<boolean>(false);
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
    
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'0.2rem'}}>
            <div><p>{task.status.toLocaleUpperCase()}</p></div>
            <input value={task.task} readOnly style={{backgroundColor:'lightgray'}}/>
            <div style={{display:'flex'}}>
                <button onClick={()=>setFormTask(task)}>edit</button>
                <button onClick={handleDone}>done</button>
                <button onClick={()=>deleteTask()}>delete</button>
            </div>            
        </div>
    )
}

export default Task;