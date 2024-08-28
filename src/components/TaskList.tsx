import { ReactNode } from "react";

function TaskList({children, category}:{category:string, children: ReactNode}){
    return (
        <div style={{display:'flex', flexDirection:'column', gap:'2rem', border:'1px solid black', padding:'2rem'}}>
            <h1>{category.toLocaleUpperCase()}</h1>
                { children }
        </div>
    )
}

export default TaskList;