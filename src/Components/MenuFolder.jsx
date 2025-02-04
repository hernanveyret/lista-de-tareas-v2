import React, { useState, useEffect } from 'react';
import NewFolder from './NewFolder';
import Folders from './Folders';
import BannerConfirm from './BannerConfirm';

import './menuFolder.css';

//onClick={() => {createNewFolder(carpeta, container, setContainer)}}

const MenuFolder = ({logo, setFolder, folder, pages, setPages,onMenuBtn, setOnMenuBtn,container, setContainer}) => {
  const [ onInputFolder, setOnInputFolder ] = useState(false)
  const [ isOpen, setIsOpen ] = useState(false);
  const [ mostrarBanner, setMostrarBanner ] = useState(false);
  const [carpetaSeleccionada, setCarpetaSeleccionada] = useState(null);

  let algo = []
  const [ texto, setTexto ] = useState({
    text:'',
    colorFondo:'',
    colorText:''
  })
  
  useEffect(() => {
    console.log(pages)
  },[pages])

  useEffect(() => {
    setCarpetaSeleccionada(pages.find((page) => page.namePage === onMenuBtn.target));
  }, [onMenuBtn, pages]);

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
  

  const deleteFolder = (e) => {
    let $target= e.currentTarget
    let id = $target.dataset.id
    setContainer((prevContainer) => [...prevContainer.filter(folder => folder.id != id )])
  }

  const deleteTask = (e) => {
    console.log('elimina tareas')
    let $target= e.currentTarget
    let id = parseInt($target.dataset.id)
    let nombre = $target.dataset.nombre.trim()
    console.log(id)
    console.log(nombre)
    
    let algo = container.find(folder => folder.id === id )
    console.log('container',container)
    console.log('algo',algo.tareas.find(page => page.namePage === nombre))
    
    console.log(container)
  }
 
  const editFolder = (e) => {
    console.log('editar nombre de carpeta');
    let $target= e.currentTarget
    let id = $target.dataset.id
    console.log(id)
  }

  const openPage = (e) => {
    let $target= e.currentTarget
    let id = $target.dataset.id
    let tarea = document.getElementById(id)
    tarea.classList.toggle('active')
  }

  const restorePage = (e) => {
    console.log('volver la pagina a la lista')
    let $target = e.currentTarget;
    let nombreDePagina = $target.dataset.nombre.trim()
    console.log(nombreDePagina)
    container.some(folder => {
      algo = folder.tareas.find(page => page.namePage === nombreDePagina)
      console.log(algo)      
    })
    setPages((prevPages) => [...prevPages, algo ])
  
    console.log(container)
  }

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
            fill="#000000">
              <path d="M560-320h80v-80h80v-80h-80v-80h-80v80h-80v80h80v80ZM160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
            </svg>
          </button>
          <button onClick={() => setFolder({...folder, openMenu: false})} className="btn btn-close-menu-folder">
            <svg xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="#000000">
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