import { useState, useEffect } from 'react'
import logo from './assets/img/check32.png';
import NewPage from './Components/NewPage.jsx';
import MenuBtn from './Components/MenuBtn.jsx';
import Confirm from './Components/Confirm.jsx';
import NoTask from './Components/NoTask.jsx';
import CalcPage from './Components/CalcPage.jsx'
import './App.css'
import Task from './Components/Task.jsx';
import NavCalc from './Components/NavCalc.jsx';
import NavText from './Components/NavText.jsx';
import TotalBar from './Components/TotalBar.jsx';


function App() {

  let completedTasks = JSON.parse(localStorage.getItem('listaDeTareas'))
  
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
  // Guarda en localStorage todos los datos , cada vez que cambia algo en pages.
  useEffect(() => {
    let newPages = pages
    localStorage.setItem('listaDeTareas', JSON.stringify(newPages))
  },[pages])

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
          if (page.namePage === namePage[0].toUpperCase() + namePage.slice(1)) {
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


useEffect(() => {
  let isNum = inputCalc.cant
  let isNumP = inputCalc.precioU  
  if (!isNaN(isNum)){
    console.log('es numero')
  }else{
    console.log('no es numero')
  }

  if (!isNaN(isNumP)){
    console.log('es numero')
  }else{
    console.log('no es numero')
  }

},[inputCalc.cant,inputCalc.precioU])

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
          if (page.namePage === namePage[0].toUpperCase() + namePage.slice(1)) {
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
      console.error(`No se encontró una página con el nombre ${namePage}`);
    }
  }
}, [namePage, pages]);

// Crea una nueva pagina para ingresar tareas.
const createNewPage = (e) => {
  e.preventDefault();  
  let nameRepeat = pages.find(e => e.namePage === enterNamePage[0].toUpperCase() + enterNamePage.slice(1))
  if(textOrCalc){
    if(!nameRepeat){
      let newPage = {
        type:'list',
        namePage: enterNamePage === '' ? `Página ${pages.length + 1}` : enterNamePage[0].toUpperCase() + enterNamePage.slice(1),
        tareas: []
      };
      setNamePage(enterNamePage)
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
      setNamePage(enterNamePage)
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
  setTaskOrPage('page')
  setOnMenuBtn({
    onoff:true,
    target: $target
  });
}
  return (
    <section className="container-app">
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
        
        />
      }
          { /* Header */ }
      <header>
        <img src={logo} alt="check, logo de la app" />
        <h1>Lista de Tareas</h1>
      </header>

          { /* botones todo y borrar */ }
      <nav className='menuNav'>
        <label><input type="checkbox" name="checkTodos" className="checkTodos" title="Selecciona todo" onClick={selectAll}/>Todos</label>
        <span title="Eliminar">
          <button className="btn btn-delete" onClick={onDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" viewBox="0 -960 960 960" 
            width="24px" 
            fill="black">
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button>
        </span>
      </nav>

        { /* Botones para seleccionar la pagina */ }
      <div className="nav-add-page">
        {
          pages.map((e, key) => 
            <button className="btn-add-page btn-select" key={key} onClick={(e) => {setNamePage(e.target.textContent)}}>
              {e.namePage}
              <span className="btn" onClick={menuBtnPage} data-name={e.namePage} id={e.id}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
              </span>
            </button>
          )
        }
        <button className="btn-add-page" onClick={() => {setFormNewPage(true); setTextOrCalc(true)}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M680-40v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v353q-18-11-38-18t-42-11v-324H200v560h280q0 21 3 41t10 39H200Zm120-160q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 160h240v-80H440v80Zm0-160h240v-80H440v80Zm0 320h54q8-23 20-43t28-37H440v80Z"/></svg>
        </button>
        <button style={{ backgroundColor: 'red' }} className="btn-add-page" onClick={() => { setFormNewPage(true); setTextOrCalc(false); }}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF">
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
          
          {selectPage?.type === 'calc' && <TotalBar selectPage={selectPage}/>}
        </main>

          {/* ingresar nueva tarea */ }
          { selectPage?.type === 'list' ? 
            <NavText inputTask={inputTask} setInputTask={setInputTask} addNewTask={addNewTask} edit={edit}/>
            :
            <NavCalc addNewTask={addNewTask} setInputCalc={setInputCalc} inputCalc={inputCalc} edit={edit} addNewCalcTask={addNewCalcTask}/>
          }
    </section>
  )
}

export default App