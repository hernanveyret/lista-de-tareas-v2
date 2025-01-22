import React, { useState } from 'react';
import './confirm.css';

const NoTask = ({setCantChecked}) => {

  return (
    <div className='container-confirm-page'> 
      <div className="cuadro">
        <p>No hay tareas seleccionadas,</p>
        <p>marque 1 o varias para borrar.</p>
        <div className="btn-confirm-container">
          <button className="btn" onClick={() => {setCantChecked(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="black">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
              </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
export default NoTask;