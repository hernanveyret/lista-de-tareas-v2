import { useState, useEffect } from 'react'
import logo from './assets/img/check32.png';
import NewPage from './Components/NewPage.jsx';
import MenuBtn from './Components/MenuBtn.jsx';
import Confirm from './Components/Confirm.jsx';
import NoTask from './Components/NoTask.jsx';
import CalcPage from './Components/CalcPage.jsx'
import Task from './Components/Task.jsx';
import NavCalc from './Components/NavCalc.jsx';
import NavText from './Components/NavText.jsx';
import TotalBar from './Components/TotalBar.jsx';
import Almanac from './Components/Almanac.jsx';
import MenuFolder from './Components/MenuFolder.jsx';

import './App.css'
function App() {

  let completedTasks = JSON.parse(localStorage.getItem('listaDeTareas'))
  let taskContainer = JSON.parse(localStorage.getItem('contenedor'))

  const [ isHoverIcons, setIsHoverIcons ] = useState(false)
  const [ container, setContainer ] = useState(taskContainer ? taskContainer : [])
  const [ pages, setPages ] = useState(completedTasks ? completedTasks : []); // base de datos de las tareas
  const [ formNewPage, setFormNewPage ] = useState(false); // planilla para crea nueva pagina.
  const [ selectPage, setSelectPage] = useState (pages ? pages[0] : {namePage:"", tareas:[]});
  const [ namePage, setNamePage ] = useState(pages.length > 0 ? pages[0].namePage : '') // toma el nombre d la pagina que se quiere ver
  const [ enterNamePage, setEnterNamePage ] = useState('');
  const [ inputTask, setInputTask ] = useState(''); // texto de la tarea
  const [ inputCalc, setInputCalc ] = useState({
    text:'',
    cant:'',
    precioU:''
  })
  const [ pageRepeat, setPageRepeat ] = useState(false);
  const [ textOrCalc, setTextOrCalc ] = useState(null)
  const [ confirm, setConfirm ] = useState(false)
  const [ cantChecked, setCantChecked ] = useState(false)
  const [ edit, setEdit ] = useState(false)
  const [ $id, set$id ] = useState(null)
  const [ check, setCheck ] = useState(null)
  const [ taskOrPage, setTaskOrPage ] = useState(null)
  const [ onMenuBtn, setOnMenuBtn ] = useState({
    onoff: false,
    target: ''
  })
  const [ onAlmanac, setOnAlmanac ] = useState(false)
  const [ folder, setFolder ] = useState({
    openMenu: false
  })  
 
  //localStorage.removeItem("contenedor");

  // Guarda en localStorage todos los datos , cada vez que cambia algo en pages.
  useEffect(() => {
    let newPages = pages
    localStorage.setItem('listaDeTareas', JSON.stringify(newPages))
  },[pages])
  
  useEffect(() => {
    let tareasGuardads = container;
    localStorage.setItem('contenedor',JSON.stringify(tareasGuardads))
  },[container])

  // agrega la tarea nueva a la pagina que corresponda.
  const addNewTask = (e) => {
    e.preventDefault()
    if(edit){ // si edit es true edita la tarea
      setPages((prevPages) => {      
        return prevPages.map((page) => ({
          ...page, // Copiar el objeto de página
          tareas: page.tareas.map((tarea) => {
            if (tarea.id === $id) {
              return { ...tarea, task: inputTask };
            }
            return tarea; // Si no coincide, devolver la tarea sin cambios
          }),
        }));
      });
      setEdit(false);
    }else{ // si no, crea una nueva tarea
      setPages((prevPages) =>
        prevPages.map((page) => {
          let name = String(namePage)[0].toUpperCase() + String(namePage).slice(1)
          if (page.namePage === name) {
            // Crear un nuevo array de tareas
            const newTasks = [...page.tareas, { id: Date.now(), task: inputTask, checked: false }];
            return { ...page, tareas: newTasks }; // Retornar la pagina actualizada.
          }
          return page; // Retornar las demas paginas sin cambios.
        })
      ); 
    }   
      setInputTask('')
    };

    const addNewCalcTask = (e) => {
      e.preventDefault()
      if(edit){ // si edit es true edita la tarea
        setPages((prevPages) => {      
          return prevPages.map((page) => ({
            ...page, // Copiar el objeto de página
            tareas: page.tareas.map((tarea) => {
              if (tarea.id === $id) {
                return { ...tarea, text: inputCalc.text, cant: inputCalc.cant, precioU:inputCalc.precioU };
              }
              return tarea; // Si no coincide, devolver la tarea sin cambios
            }),
          }));
        });
        setEdit(false);
      }else{ // si no, crea una nueva tarea
        setPages((prevPages) =>
          prevPages.map((page) => {
            if (page.namePage === namePage[0].toUpperCase() + namePage.slice(1)) {
              // Crear un nuevo array de tareas
              const newTasks = [...page.tareas, { id: Date.now(), text: inputCalc.text, cant: inputCalc.cant || 0, precioU:inputCalc.precioU || 0, checked: false }];
              return { ...page, tareas: newTasks }; // Retornar la pagina actualizada.
            }
            return page; // Retornar las demas paginas sin cambios.
          })
        ); 
      }   
        setInputCalc({
          text:'',
          cant:'',
          precioU:''
        })
      };

    const onDelete = () => {
      let cantPages = document.querySelectorAll('.checked-task');
      let tiene = [...cantPages].find(e => e.checked === true);
      if(tiene){
        setConfirm(true)
        setTaskOrPage('task')
      }else{
        setCantChecked(true)
      }      
    }
    
    // Elimina las tareas seleccionadas.
    const deleteTask = () => {
        setPages((prevPages) =>
        prevPages.map((page) => {
          if (page.namePage === String(namePage)[0].toUpperCase() + String(namePage).slice(1)) {
            // Filtrar las tareas no marcadas
            const newTasks = page.tareas.filter((task) => {
              const taskElement = document.querySelector(`[data-check="${task.id}"]`);
              return !taskElement?.checked;
            });
            return { ...page, tareas: newTasks }; // Retornar pagina actualizada
          }
          return page; // Retornar las otras paginas sin cambios
        })
      );     
      setConfirm(false)
      const $checkAll = document.querySelector('.checkTodos');
      if($checkAll){
        $checkAll.checked = false
      }
      
    };
    
    // Selecciona todas las tareas
  const selectAll = () => {
    const $checked = document.querySelectorAll('.checked-task');
    setCheck($checked)    
  }
  useEffect(() => {
    const $checkAll = document.querySelector('.checkTodos');
    if(check){
         check.forEach(c => {
        c.checked = $checkAll.checked        
      })
    }
  },[check])

  // Edita una tarea.
  const editTask  = (id) => {
    scrollToEdit()
    setEdit(true)
    const $id = parseInt(id.currentTarget.dataset.id)
    set$id($id)
    pages.filter(e => {
    e.tareas.filter(t => {
      if(parseInt(t.id) === $id){
        setInputTask(t.task)
      }
    })
   })
  };

  // Edita una tarea de calculo.
  const editCalcTask  = (id) => {
    scrollToEdit()
    setEdit(true)
    const $id = parseInt(id.currentTarget.dataset.id)
    set$id($id)
    pages.filter(e => {
    e.tareas.filter(t => {
      if(parseInt(t.id) === $id){
        setInputCalc({
          text: t.text,
          cant: t.cant,
          precioU: t.precioU
        })
      }
    })
   })
  };

  // Marcar ' tachar ' una tarea como completada.
  const taskCompleted = (id) => {
    const $id = parseInt(id.currentTarget.dataset.id)
    setPages((prevPages) => {      
      return prevPages.map((page) => ({
        ...page, // Copiar el objeto de página
        tareas: page.tareas.map((tarea) => {
          // Si el ID coincide cambia el estado de checked por lo contrario.
          if (tarea.id === $id) {
            return { ...tarea, checked: !tarea.checked };
          }
          return tarea; // Si no coincide, devolver la tarea sin cambios
        }),
      }));
    });
  };
 
  // Busca la pagina seleccionada para mostrar las tareas.
  useEffect(() => {   
    if (!namePage && pages.length > 0) {
      setNamePage(pages[0].namePage); // Establecer el primer nombre de página
    }
    
  if (namePage) { // Verificar que namePage no sea null
    const botonesSelect = document.querySelectorAll('.btn-select');
    if(botonesSelect){
      botonesSelect.forEach(e => {
        if(e.textContent === namePage[0].toUpperCase() + namePage.slice(1)){
          e.classList.add('activePage')
        }else{
          e.classList.remove('activePage')
        }        
      })
    }
    
    let pagesSelect = pages.find(e => e['namePage'] === namePage[0].toUpperCase() + namePage.slice(1));
    if (pagesSelect) {
      setSelectPage(pagesSelect); 
    } else {
      setSelectPage([])
      console.error(`No se encontró una página con el nombre ${namePage}`);
    }
  }
}, [namePage,pages]);

useEffect(() => {
  if(pages.length === 0 ){
    setSelectPage([])
  }
},[pages, namePage, folder])

// Crea una nueva pagina para ingresar tareas.
const createNewPage = (e) => {
  e.preventDefault();    
  let checkName = enterNamePage ? String(enterNamePage)[0].toUpperCase() + String(enterNamePage).slice(1) : "";
  let nameRepeat = pages.find(e => e.namePage === checkName)
  if(textOrCalc){

    if(!nameRepeat){
      let newPage = {
        type:'list',
        namePage: enterNamePage === '' ? `Página ${pages.length + 1}` : enterNamePage[0].toUpperCase() + enterNamePage.slice(1),
        tareas: []
      };
      setNamePage(enterNamePage ? enterNamePage : newPage.namePage)
      setPages([...pages, newPage])
      setFormNewPage(false);
      setPageRepeat(false);
      setEnterNamePage('');
    }else{
      setEnterNamePage('')
      setPageRepeat(true)
    }
  }else{
    if(!nameRepeat){
      let newPage = {
        type: 'calc',
        namePage: enterNamePage === '' ? `Página ${pages.length + 1}` : enterNamePage[0].toUpperCase() + enterNamePage.slice(1),
        tareas: []
      };
      setNamePage(enterNamePage ? enterNamePage : newPage.namePage)
      setPages([...pages, newPage])
      setFormNewPage(false);
      setPageRepeat(false);
      setEnterNamePage('');
    }else{
      setEnterNamePage('')
      setPageRepeat(true)
    }
  }
 
};

  // Menu en los botones de pagina
const menuBtnPage = (e) => {
  let $target = e.currentTarget.parentElement.textContent; // toma el texto del boton
  setNamePage($target)
  setTaskOrPage('page')
  setOnMenuBtn({
    onoff:true,
    target: $target
  });
  
}
// Scroll al input de edit task
const scrollToEdit = () => {
  const editInput = document.querySelector('.input-text');
  if (editInput) {
      editInput.scrollIntoView({ behavior: 'smooth' });
  }
}
useEffect(() => {
  const cuadroApp = document.querySelector('.container-app');
  const cuadroFolder = document.querySelector('.container-menu-folder')
  if(cuadroApp){    
    let altoApp = cuadroApp.scrollHeight;   
    if(cuadroFolder){      
      let altoFolder = cuadroFolder.scrollHeight;      
      cuadroFolder.style.height = `${altoApp}px`
    }
  }
})

  return (
    <section className="container-app">   
      {
        onAlmanac && <Almanac 
        setOnAlmanac={setOnAlmanac}
        />
      }
      { cantChecked && <NoTask 
        setCantChecked={setCantChecked}
      />}
      { 
        /* Cartel de confirm */
        confirm && <Confirm 
        setConfirm={setConfirm}
        deleteTask={deleteTask}
        taskOrPage={taskOrPage}
        />
      }           
      { 
        /* Crear nueva pagina */
        formNewPage && <NewPage 
        createNewPage={createNewPage}
        setEnterNamePage={setEnterNamePage}
        enterNamePage={enterNamePage}
        pageRepeat={pageRepeat}
        setFormNewPage={setFormNewPage}
        />
      }
      {
        /* menu del boton de pagina */
        onMenuBtn.onoff && <MenuBtn 
        setOnMenuBtn={setOnMenuBtn}
        onMenuBtn={onMenuBtn}
        pages={pages}
        setPages={setPages}
        namePage={namePage}
        setNamePage={setNamePage}
        pageRepeat={pageRepeat}
        setSelectPage={setSelectPage}
        taskOrPage={taskOrPage}
        confirm={confirm}
        setConfirm={setConfirm}
        folder={folder}
        setFolder={setFolder}
        />
      }
          { /* Header */ }
      <header>
        <img src={logo} alt="check, logo de la app" />
        <h1 id="header">Lista de Tareas</h1>
      </header>

          { /* botones todo / carpetas / almanaque / borrar */ }
      <nav className='menuNav'>
        <label><input type="checkbox" name="checkTodos" className="checkTodos" title="Selecciona todo" onClick={selectAll}/>Todos</label>        
        <span className="btn-texto">
        <button 
          className="btn folder-btn" 
          title="Carpetas"
          onClick={() => setFolder({ ...folder, openMenu: true })}
          onMouseEnter={() => setIsHoverIcons('hoverFolderTrue')} 
          onMouseLeave={() => setIsHoverIcons('hoverFolderFalse')}
            >
          { isHoverIcons === 'hoverFolderTrue' ?        
            <svg xmlns="http://www.w3.org/2000/svg" 
              height="24px" width="24px" viewBox="0 -960 960 960" 
              fill="#FFFF55">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640H160v400l96-320h684L837-217q-8 26-29.5 41.5T760-160H160Z"/>
            </svg> 
            :  
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#000000">
              <path d="M160-160q-33 0-56.5-23.5T80-240v-480q0-33 23.5-56.5T160-800h240l80 80h320q33 0 56.5 23.5T880-640v400q0 33-23.5 56.5T800-160H160Zm0-80h640v-400H447l-80-80H160v480Zm0 0v-480 480Z"/>
            </svg>
          }
            <p>Carpetas</p>
          </button>
          <button title="Almanaque" className="btn" onClick={() => { setOnAlmanac(true)}}
            onMouseEnter={() => setIsHoverIcons('hoverAlmanaqueTrue')} 
            onMouseLeave={() => setIsHoverIcons('hoverAlmanaqueFalse')}
            >
            {
              isHoverIcons === 'hoverAlmanaqueTrue' ?
              <svg xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="#FFFFFF">
                <path d="M480-400q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240ZM200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Z"/>
              </svg>
            :
            <svg xmlns="http://www.w3.org/2000/svg" 
              height="24px" 
              viewBox="0 -960 960 960" 
              width="24px" 
              fill="#000000"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z"/>
            </svg>
            }             
            <p>Almanaque</p>
          </button>
          <button className="btn btn-delete" onClick={onDelete} title="Borrar tareas"
          onMouseEnter={() => setIsHoverIcons('hoverBorrarTrue')} 
          onMouseLeave={() => setIsHoverIcons('hoverBorrarFalse')}
          >
            {
              isHoverIcons === 'hoverBorrarTrue' ? 
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 60 60"
                style={{ enableBackground: "new 0 0 60 60" }}
                xmlSpace="preserve"
                width="24px"
                height="24px"
              >
                <g>
                  <path d="M49.416,10.199c-0.572-0.759-1.405-1.25-2.346-1.382l-9.352-1.314l0.417-2.971c0.111-0.791-0.093-1.58-0.577-2.222 s-1.185-1.056-1.977-1.167L27.661,0.03c-0.791-0.111-1.58,0.094-2.222,0.577c-0.641,0.483-1.056,1.185-1.167,1.976l-0.418,2.971 L14.504,4.24c-1.942-0.272-3.745,1.085-4.017,3.026l-0.619,4.401l8.353,1.174l-5.855,5.855c-0.089,0.089-0.144,0.198-0.204,0.305 h-1.03v37.271c0,2.057,1.673,3.729,3.729,3.729h28.541c2.057,0,3.729-1.673,3.729-3.729V19h-5v-2.799l7.347,1.032l0.618-4.399 C50.229,11.893,49.988,10.957,49.416,10.199z M26.253,2.861c0.037-0.262,0.175-0.495,0.39-0.657 c0.214-0.161,0.478-0.231,0.74-0.193l7.922,1.113c0.262,0.037,0.496,0.176,0.658,0.391c0.162,0.214,0.23,0.477,0.193,0.738 l-0.417,2.971l-9.903-1.392L26.253,2.861z M18.475,15.414L22.061,19h-7.171L18.475,15.414z M35.132,16v3h-1v-3h-10v2.243 l-5.319-5.319L40.702,16H35.132z M40.132,18v1h-3v-1H40.132z M32.132,18v1h-6v-1H32.132z M45.132,21v35.271 c0,0.954-0.776,1.729-1.729,1.729H14.862c-0.954,0-1.729-0.775-1.729-1.729V21h11h0.07h9.93h1h7H45.132z M48.117,12.556 l-0.34,2.418l-35.65-5.01l0.34-2.42c0.119-0.849,0.904-1.439,1.758-1.324l9.351,1.314v0l8.601,1.209l14.615,2.054 c0.412,0.058,0.776,0.272,1.026,0.604C48.069,11.734,48.175,12.144,48.117,12.556z" />
                  {[...Array(36)].map((_, index) => {
                    const cx = [17, 17, 20, 26, 20, 26, 23, 29, 23, 29, 32, 38, 32, 38, 35, 41, 35, 41][index % 18];
                    const cy = [28, 34, 25, 25, 31, 31, 28, 28, 34, 34, 25, 25, 31, 31, 28, 28, 34, 34][index % 18] + Math.floor(index / 18) * 12;
                    return <circle key={index} cx={cx} cy={cy} r="1" />;
                  })}
                </g>
              </svg>
              :
              <svg
                version="1.1"
                id="Capa_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 53 53"
                xmlSpace="preserve"
                width="24px"
                height="24px"
              >
                <g>
                  <path d="M46.5,9.557C46.5,7.596,44.904,6,42.943,6H33.5V3c0-1.654-1.346-3-3-3h-8c-1.654,0-3,1.346-3,3v3h-9.443 C8.096,6,6.5,7.596,6.5,9.557V14h2v35.271C8.5,51.327,10.173,53,12.229,53h28.541c2.057,0,3.729-1.673,3.729-3.729V14h2V9.557z M21.5,3c0-0.552,0.449-1,1-1h8c0.551,0,1,0.448,1,1v3h-10V3z M42.5,49.271c0,0.954-0.776,1.729-1.729,1.729H12.229 c-0.954,0-1.729-0.775-1.729-1.729V14h32V49.271z M44.5,12h-36V9.557C8.5,8.698,9.198,8,10.057,8H19.5h14h9.443 C43.802,8,44.5,8.698,44.5,9.557V12z" />
                  {[14, 14, 17, 23, 17, 23, 20, 26, 20, 26, 29, 35, 29, 35, 32, 38, 32, 38, 14, 14, 17, 23, 17, 23, 20, 26, 20, 26, 29, 35, 29, 35, 32, 38, 32, 38, 14, 17, 23, 17, 23, 20, 26, 29, 35, 29, 35, 32, 38].map((cx, i) => (
                    <circle key={i} cx={cx + 0.5} cy={18 + Math.floor(i / 9) * 6} r="1" />
                  ))}
                </g>
              </svg>
            }            
            <p>Borrar</p>
          </button>
        </span>
      </nav>

        { /* Botones para seleccionar la pagina */ }
      <div className="nav-add-page">
        {
          pages.map((e, key) => 
            <button className="btn-add-page btn-select" key={key} onClick={(e) => {
             setNamePage(e.target.textContent)
              }}>
              {e.namePage}
              <span className="btn" onClick={(e) => {
                e.stopPropagation()
                menuBtnPage(e) 
                }} data-name={e.namePage} id={e.id}>
                <svg xmlns="http://www.w3.org/2000/svg" 
                  height="24px" 
                  viewBox="0 -960 960 960" 
                  width="24px" 
                  fill="#FFFFFF">
                  <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/>
                </svg>
              </span>
            </button>
          )
        }
        <button className="btn-add-page" onClick={() => {setFormNewPage(true); setTextOrCalc(true)}} title="Nueva lista de tareas">
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px"
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#FFFFFF">
              <path d="M680-40v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v353q-18-11-38-18t-42-11v-324H200v560h280q0 21 3 41t10 39H200Zm120-160q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 160h240v-80H440v80Zm0-160h240v-80H440v80Zm0 320h54q8-23 20-43t28-37H440v80Z"/>
          </svg>
        </button>
        <button style={{ backgroundColor: 'red' }} className="btn-add-page" onClick={() => { setFormNewPage(true); setTextOrCalc(false); }} title="Nueva lista de compras">
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" 
            fill="#FFFFFF">
              <path d="M440-240h80v-40h40q17 0 28.5-11.5T600-320v-120q0-17-11.5-28.5T560-480H440v-40h160v-80h-80v-40h-80v40h-40q-17 0-28.5 11.5T360-560v120q0 17 11.5 28.5T400-400h120v40H360v80h80v40ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm0-80h480v-446L526-800H240v640Zm0 0v-640 640Z"/>
              <rect x="600" y="-450" width="1900" height="18000" fill="red" />
              <text x="800" y="-120" fontSize="670" fill="#fffff" textAnchor="middle" alignmentBaseline="middle" fontWeight="bold">+</text>
          </svg>
        </button>
      </div>

        { /* Mostrar las tareas */ }
        <main className="lista-main">
          {selectPage?.type === 'list' && <Task selectPage={selectPage} taskCompleted={taskCompleted} editTask={editTask}/>}
          {selectPage?.type === 'calc' && <CalcPage selectPage={selectPage} taskCompleted={taskCompleted} editCalcTask={editCalcTask}/>}          
          {selectPage?.type === 'calc' && <TotalBar selectPage={selectPage} pages={pages} setPages={setPages}/>}
        </main>

          {/* ingresar nueva tarea */ }
          { selectPage?.type === 'list' ? 
            <NavText inputTask={inputTask} setInputTask={setInputTask} addNewTask={addNewTask} edit={edit}/>
            :
            <NavCalc addNewTask={addNewTask} setInputCalc={setInputCalc} inputCalc={inputCalc} edit={edit} addNewCalcTask={addNewCalcTask}/>
          }
          {
            // folders
            folder.openMenu && <MenuFolder 
            logo={logo}
            setFolder={setFolder}
            onMenuBtn={onMenuBtn}
            setOnMenuBtn={setOnMenuBtn}
            pages={pages}
            setPages={setPages}
            container={container}
            setContainer={setContainer}
            setConfirm={setConfirm}
            confirm={confirm}
            namePage={namePage}
            setNamePage={setNamePage}
            setIsHoverIcons={setIsHoverIcons}
            isHoverIcons={isHoverIcons}
            />
          }
    </section>
  )
}

export default App