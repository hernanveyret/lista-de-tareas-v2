import React from 'react';

const Task = ({selectPage,taskCompleted,editTask}) => {

  return (
    <div>
          { 
          selectPage?.tareas?.length > 0 ? (
            selectPage.tareas.map((task) => (
              <div key={task.id} className="tareaContenedor">
                <input type="checkbox"  name="check tarea" data-check={task.id} className="checked-task"/>
                  <div>
                  { task.checked === true ?  <p style={{textDecoration:"line-through"}}>{task.task}</p> : <p>{task.task}</p>}
                  </div>
                <button className="btn" data-id={task.id} onClick={taskCompleted}>
                { task.checked === false ? 
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="red">
                    <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                  </svg> 
                : 
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="#75FB4C">
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                  </svg> 
                }
                </button>
                <button className="btn" data-id={task.id} onClick={editTask} >
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="black">
                      <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
                  </svg>
                </button>
              </div>
            ))
          ) : (
            <p className="not-tasks">No hay tareas para esta página</p>
          )
          }
      </div>
  )
}
export default Task;