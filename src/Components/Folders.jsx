import React from 'react';
import './folders.css'

const Folders = ({folder,  addToFolder, editFolder, deleteFolder, deleteTask, openPage}) => {

  console.log(folder.tareas)
  folder.tareas.forEach(e => {
    console.log(e.namePage)
  })
  return (
  <>
  <nav data-id={folder.id}>
    <span className="container-name">
      <p>{folder.folderName}</p>
    </span>
    <span className="container-btn-folder">
    <button className='btn' onClick={(addToFolder)} data-id={folder.id}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="#000000">
          <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
      </svg>
    </button>
    <button className='btn' onClick={editFolder} data-id={folder.id}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="black">
          <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
      </svg>
    </button>
    
    <button className='btn' onClick={deleteFolder} data-id={folder.id}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" viewBox="0 -960 960 960" 
        width="24px" 
        fill="black">
        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
      </svg>
    </button>
    <button className='btn' onClick={openPage}>
      <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="black">
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z"/>
      </svg>
    </button>
    </span>
   </nav>
    <div className="container-folder-task">
      <p>Lista de tareas guardadas</p>
      {
        folder.tareas.map(task => (   
          <div className="list-task">      
            <div className="title">  
              <p>{task.namePage}</p>
              <button className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  height="24px" 
                  viewBox="0 -960 960 960" 
                  width="24px" 
                  fill="#000000">
                    <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
                </svg></button>
              <button className="btn">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  height="24px" viewBox="0 -960 960 960" 
                  width="24px" 
                  fill="black">
                  <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/>
                </svg>
              </button>
            </div>
             {
             task.tareas.map(tareas => (
              <div className="task">
              <p>{tareas.text || tareas.task}</p>
              <p>
                {tareas.checked ? 
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="green">
                      <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/>
                  </svg> 
                    :
                  <svg xmlns="http://www.w3.org/2000/svg" 
                    height="24px" 
                    viewBox="0 -960 960 960" 
                    width="24px" 
                    fill="red">
                     <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                  </svg>
                }
              </p>
              </div>
             ))
             }         
          </div>
        ))
      }
    </div>
   </>
  )
}
export default Folders;