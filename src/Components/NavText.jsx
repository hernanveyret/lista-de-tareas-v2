import React,{ useState } from 'react';

const NavText = ({addNewTask,inputTask, setInputTask, edit}) => {
  
  return (
    <nav className="input-text">   
              <form onSubmit={addNewTask}>
                <input type="text" name="nuevoTexto" className="nuevoTexto"  value={inputTask} placeholder="Ingrese nueva tarea..." onChange={(e) => {setInputTask(e.target.value)}} autoFocus/>
                <label>
                <input type="submit" name="new-task" value="" className="btn-input-submit"/>
                <div className="btn btn-add-task">
                  { edit ?  
                    <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="black">
                      <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
                    </svg>
                  :
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="black"
                >
                  <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
                </svg>
                   }
                </div>
                <input type="hidden" id="edit-id" />
                </label>
              </form>
            </nav> 
  )
}
export default NavText;