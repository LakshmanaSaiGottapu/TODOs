import { PayLoad, TaskType } from "./App";
export type Action = { type: string, task:TaskType};
function reducer(state:PayLoad, action:Action):PayLoad{
    const {type, task} = action;
    switch(type){
        case 'create':{
            state[task['status']].push(task);
            return {...state};
        }

        case 'edit':{
            const newTodos = {...state}
            const statusArray = Object.keys(state);
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
            return newTodos;
        }
        
        case 'done':{
            if(task.status !== 'done'){
                const filteredTodos = state[task.status].filter(item => item.id !== task.id);
                state[task.status] = filteredTodos;
                task.status = 'done'
                state['done'].push(task);
                return {...state};
            }
            return state;
        }

        case 'delete':{
            state[task.status] = state[task.status].filter(item => item.id !== task.id);
            return {...state};
        }
        
        default: return state;
    }
}

export default reducer;

