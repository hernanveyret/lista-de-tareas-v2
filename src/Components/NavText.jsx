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
                    <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24px"
                    viewBox="0 -960 960 960"
                    width="24px"
                    fill="black"
                  >
                    <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
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