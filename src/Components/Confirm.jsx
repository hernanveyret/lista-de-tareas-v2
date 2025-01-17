import React, { useState } from 'react';
import './confirm.css';

const Confirm = ({setConfirm,deleteTask}) => {


  return (
    <div className='container-confirm-page'> 
      <div className="cuadro">
        <p>¿Desea borrar el contenido?</p>
        <div className="btn-confirm-container">
          <button className="btn" onClick={deleteTask}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg>
          </button>
          <button className="btn" onClick={() => {setConfirm(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default Confirm;