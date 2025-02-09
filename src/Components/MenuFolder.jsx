import React, { useState, useEffect } from 'react';
import NewFolder from './NewFolder';
import Folders from './Folders';
import BannerConfirm from './BannerConfirm';
import RenameFolder from './RanemeFolder';
import ConfirmDeleteFolder from './ConfirmDeleteFolder';

import './menuFolder.css';

const MenuFolder = ({logo, setFolder, folder, pages, setPages,onMenuBtn, setOnMenuBtn,container, setContainer}) => {
  
  const [ onInputFolder, setOnInputFolder ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false);
  const [ mostrarBanner, setMostrarBanner ] = useState(false);
  const [ carpetaSeleccionada, setCarpetaSeleccionada] = useState(null);
  const [ pageToRestore, setPageToRestore ] = useState(null)
  const [ nombreDePagina, setNombreDePagina] = useState('');  
  const [ openMenu, setOpenMenu ] = useState(null);
  const [ confirmDelete, setConfirmDelete ] = useState(false);
  const [ isDelete, setIsDelete ] = useState (false)
  const [ folderId, setfolderId ] = useState(null);
  const [ openRename, setOpenRename ] = useState({
    onOf:false,
    id:''
  })
  const [ texto, setTexto ] = useState({
    text:'',
    colorFondo:'',
    colorText:''
  })
  
  const editNameFolder = (e) => {
    let $target = e.currentTarget
    let id = parseInt($target.dataset.id)
    setOpenRename({
      onOf: true,
      id: id
    })
  }
  
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
      let id = parseInt($target.dataset.id)
    setfolderId(id)
    setIsDelete(true)      
  }
  //borrar carpeta
  useEffect(() => {
    console.log(confirmDelete)
    if(confirmDelete){     
      setContainer((prevContainer) => [...prevContainer.filter(folder => folder.id != folderId )])
      setIsDelete(false)
    }
  },[confirmDelete])

  // borra una tarea de una carpeta.
  const deleteTask = (e,confirmText) => {
    let $target = e.currentTarget;
    let id = parseInt($target.dataset.id);
    let nombre = $target.dataset.nombre.trim();
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
    setTexto({ ...texto, text:`Se ${confirmText} con exito.`, colorFondo:'#28a745', colorText:'white'})
      setMostrarBanner(true);
      setTimeout(() => setMostrarBanner(false), 3000);
      return;    
};


  // Abre la carpeta seleccionada.
  const openPage = (e) => {
    let $target= e.currentTarget
    let id = parseInt($target.dataset.id)
    let tarea = document.getElementById(id)
    let tiene = container.find(folder => folder.id === id )
    if(tiene.tareas.length > 0){
      tarea.classList.toggle('active')
      setOpenMenu(openMenu === id ? null : id);
    }
  }
 // Mueve una tarea a la lista y la elimina de la carpeta.
  const restorePage = (e) => {
    let $target = e.currentTarget;
    let id = parseInt($target.dataset.id)
    setPageToRestore(container.find(page => page.id === id))
    setNombreDePagina($target.dataset.nombre.trim());
    deleteTask(e,'movio');
  }
  //cierra la carpeta si se queda sin tareas.
  useEffect(() => {    
    container.forEach(folder => {
      if(folder.tareas.length === 0 ){
        let tarea = document.getElementById(folder.id);
        tarea.classList.remove('active')        
      }
    })
  },[container])

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
       { isDelete && <ConfirmDeleteFolder 
        setConfirmDelete={setConfirmDelete}
        setIsDelete={setIsDelete}
       /> }
      { openRename.onOf && <RenameFolder 
        setOpenRename={setOpenRename}
        openRename={openRename}
        container={container}
        setContainer={setContainer}
      /> }
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
             setOpenRename={setOpenRename}
             openRename={openRename}
             editNameFolder={editNameFolder}
             deleteFolder={deleteFolder}
             deleteTask={deleteTask}
             openPage={openPage}
             setIsOpen={setIsOpen}
             isOpen={isOpen}
             restorePage={restorePage}
             openMenu={openMenu}
             
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