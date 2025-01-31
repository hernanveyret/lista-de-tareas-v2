import React, { useState } from 'react';
import NewFolder from './NewFolder';
import Folders from './Folders';

import './menuFolder.css';

//onClick={() => {createNewFolder(carpeta, container, setContainer)}}

const MenuFolder = ({logo, setFolder, folder, pages, onMenuBtn, container, setContainer}) => {
  const [ onInputFolder, setOnInputFolder ] = useState(false)

 let carpeta = pages.find((page) => page.namePage === onMenuBtn.target);
  console.log(carpeta)

  const addToFolder = () => {
    console.log('agregar pagina a la carpeta seleccionada')
  }

  const deleteFolder = () => {
    console.log('eliminar la carpeta');
  }

  const deleteTask = () => {
    console.log('elimina tareas')
  }
 
  const editFolder = () => {
    console.log('editar nombre de carpeta')
  }
  
  return (
    <div className="container-menu-folder">
      { onInputFolder && <NewFolder 
        setOnInputFolder={setOnInputFolder}
        container={container}
        setContainer={setContainer}
      />}
      <header>
        <img src={logo} alt="check, logo de la app" />
        <h1>Lista de Tareas</h1>
      </header>
      <main>      
        <nav className="nav-btn-folder">
          <button className="btn create-folder" onClick={() => {setOnInputFolder(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#000000">
              <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
            </svg>
          </button>
          <button onClick={() => setFolder({...folder, openMenu: false})} className="btn btn-close-menu-folder">
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="black">
              <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
          </svg> 
          </button>
        </nav>
        {
          container.length > 0 ? 
          container.map((folder) => (
            <Folders 
             folder={folder}
            />
          )) 
          :
          <p style={{color: 'white', textAlign:'center', margin:'1rem 0'}}>No hay carpetas creadas</p>
        }
      </main>
    </div>
  )
}
export default MenuFolder;

//<p style={{color: 'white', textAlign:'center', margin:'1rem 0'}}>No hay carpetas creadas</p>