import React from 'react';

const ConfirmDeleteTask = ({setConfirmDeleteTask, setIsDeleteTask, deleteDataTask}) => {
  
  return (
    <div className='container-confirm-page'> 
      <div className="cuadro">         
        <p style={{fontWeight:'bold'}}>¿Desea eliminar la página "{deleteDataTask.nombre}"?</p>
        <div className="btn-confirm-container">
          <button className="btn" onClick={() => setConfirmDeleteTask(true)}>
            <svg xmlns="http://www.w3.org/2000/svg"
             height="24px"
             viewBox="0 -960 960 960" 
             width="24px" 
             fill="#000">
            <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
            </svg>
          </button>
          <button className="btn" onClick={() => {setIsDeleteTask(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default ConfirmDeleteTask;