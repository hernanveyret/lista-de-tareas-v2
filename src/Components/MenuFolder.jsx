import React, { useState, useEffect } from 'react';
import NewFolder from './NewFolder';
import Folders from './Folders';
import BannerConfirm from './BannerConfirm';

import './menuFolder.css';
console.log('menu folder')
//onClick={() => {createNewFolder(carpeta, container, setContainer)}}

const MenuFolder = ({logo, setFolder, folder, pages, setPages,onMenuBtn, setOnMenuBtn,container, setContainer}) => {
  const [ onInputFolder, setOnInputFolder ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false);
  const [ mostrarBanner, setMostrarBanner ] = useState(false);
  const [ carpetaSeleccionada, setCarpetaSeleccionada] = useState(null);
  const [ pageToRestore, setPageToRestore ] = useState(null)
  const [ nombreDePagina, setNombreDePagina] = useState('')
  const [ texto, setTexto ] = useState({
    text:'',
    colorFondo:'',
    colorText:''
  })
  
  useEffect(() => {
    setCarpetaSeleccionada(pages.find((page) => page.namePage === onMenuBtn.target));
  }, [onMenuBtn, pages]);

  // Agrega una lista a la carpeta.
  const addToFolder = (e) => {
    let $target = e.currentTarget;
    let id = parseInt($target.dataset.id);
    if (!carpetaSeleccionada) {
      setTexto({ ...texto, text:'No hay página seleccionada.', colorFondo:'#dc3545', colorText:'white'})
      setMostrarBanner(true);
      setTimeout(() => setMostrarBanner(false), 3000);
      return;
    }
  
    setContainer((prevContainer) => 
      prevContainer.map((folder) => 
        folder.id === id 
          ? { ...folder, tareas: [...folder.tareas, carpetaSeleccionada] } 
          : folder
      )
    );

    setTexto({ ...texto, text:`Se guardo " ${carpetaSeleccionada.namePage} " con exito!`, colorFondo:'#28a745', colorText:'white'})
    setMostrarBanner(true);
    setTimeout(() => setMostrarBanner(false), 3000);
    setPages((prevPages) => [...prevPages.filter(page => page.namePage != carpetaSeleccionada.namePage)])
    setCarpetaSeleccionada(null);
    setOnMenuBtn({...onMenuBtn, target:''});
  };
  
  // borra una carpeta entera.
  const deleteFolder = (e) => {
    let $target= e.currentTarget
    let id = $target.dataset.id
    setContainer((prevContainer) => [...prevContainer.filter(folder => folder.id != id )])
  }
  // borra una tarea de una carpeta.
  const deleteTask = (e) => {
    console.log('Elimina tareas');
    let $target = e.currentTarget;
    let id = parseInt($target.dataset.id);
    let nombre = $target.dataset.nombre.trim();
    console.log(id, nombre);
    let newContainer = container.map((folder) => {
        if (folder.id === id) {
            return {
                ...folder,
                tareas: folder.tareas.filter((page) => page.namePage !== nombre)
            };
        }
        return folder;
    });
    setContainer(newContainer);
    setTexto({ ...texto, text:`Se borro con exito " ${nombre} "`, colorFondo:'#28a745', colorText:'white'})
      setMostrarBanner(true);
      setTimeout(() => setMostrarBanner(false), 3000);
      return;
};

  const editFolder = (e) => {
    console.log('editar nombre de carpeta');
    let $target= e.currentTarget
    let id = $target.dataset.id
    console.log(id)
  }
  // Abre la carpeta seleccionada.
  const openPage = (e) => {
    let $target= e.currentTarget
    let id = $target.dataset.id
    let tarea = document.getElementById(id)
    tarea.classList.toggle('active')
  }
 // Mueve una tarea a la lista y la elimina de la carpeta.
  const restorePage = (e) => {
    console.log('volver la pagina a la lista')
    let $target = e.currentTarget;
    let id = parseInt($target.dataset.id)
    setPageToRestore(container.find(page => page.id === id))
    setNombreDePagina($target.dataset.nombre.trim());
    deleteTask(e)
    
  }
  // useEffect de restorePage
  useEffect(() => {
    if(pageToRestore){
      pageToRestore.tareas.forEach(t => {
        if(t.namePage === nombreDePagina){
          setPages((prevPages) => [...prevPages, t])
        }
      })
    }
  },[pageToRestore])

  return (
    <div className="container-menu-folder">
      { mostrarBanner && <BannerConfirm text={texto} />}
      { onInputFolder && <NewFolder 
        setOnInputFolder={setOnInputFolder}
        container={container}
        setContainer={setContainer}
      />}
      <header>
        <img src={logo} alt="check, logo de la app" />
        <h1>Lista de Carpetas</h1>
      </header>
      <main className="main">       
        <nav className="nav-btn-folder">
          <button className="btn create-folder" onClick={() => {setOnInputFolder(true)}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="black">
              <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
            </svg>
          </button>
          <button onClick={() => setFolder({...folder, openMenu: false})} className="btn btn-close-menu-folder">
            <svg xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="black">
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
          </button>
        </nav>
        {
          container.length > 0 ? 
          container.map((folder) => (
            <Folders 
             key={folder.id}
             folder={folder}
             addToFolder={addToFolder}
             editFolder={editFolder}
             deleteFolder={deleteFolder}
             deleteTask={deleteTask}
             openPage={openPage}
             setIsOpen={setIsOpen}
             isOpen={isOpen}
             restorePage={restorePage}
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