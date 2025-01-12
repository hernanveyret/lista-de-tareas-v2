import { useState, useEffect } from 'react'
import logo from './assets/img/check32.png';
import NewPage from './Components/NewPage.jsx';
import './App.css'

function App() {

  let completedTasks = JSON.parse(localStorage.getItem('listaDeTareas'))
  
  const [ pages, setPages ] = useState(completedTasks ? completedTasks : []); // base de datos de las tareas
  const [ formNewPage, setFormNewPage ] = useState(false); // planilla para crea nueva pagina.
  const [ selectPage, setSelectPage] = useState (pages ? pages[0] : {namePage:"", tareas:[]});
  const [ namePage, setNamePage ] = useState(pages.length > 0 ? pages[0].namePage : '') // toma el nombre d la pagina que se quiere ver
  const [ enterNamePage, setEnterNamePage ] = useState('');
  const [ inputTask, setInputTask ] = useState(''); // texto de la tarea
  const [ pageRepeat, setPageRepeat ] = useState(false);

  // Guarda en localStorage todos los datos , cada vez que cambia algo en pages.
  useEffect(() => {
    let newPages = pages
    localStorage.setItem('listaDeTareas', JSON.stringify(newPages))
  },[pages])

  // agrega la tarea nueva a la pagina que corresponda.
  const addNewTask = (e) => {
    e.preventDefault()
      setPages((prevPages) =>
        prevPages.map((page) => {
          if (page.namePage === namePage) {
            // Crear un nuevo array de tareas
            const newTasks = [...page.tareas, { id: Date.now(), task: inputTask, checked: false }];
            return { ...page, tareas: newTasks }; // Retornar la pagina actualizada.
          }
          return page; // Retornar las demas paginas sin cambios.
        })
      );    
      setInputTask('')
    };
          
  const handleDelete = () => {
    // elimina una o todas las tareas.
  }

  const editTask  = (id) => {    
    const $id = parseInt(id.currentTarget.dataset.id)
    pages.filter(e => {
    e.tareas.filter(t => {
      if(parseInt(t.id) === $id){
        setInputTask(t.task)
      }
    })
   })
    
    console.log('editar')

  }
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
  }

  // Busca la pagina seleccionada para mostrar las tareas.
  useEffect(() => {
  if (namePage) { // Verificar que namePage no sea null
    let pagesSelect = pages.find(e => e['namePage'] === namePage);
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
  
  let nameRepeat = pages.find(e => e.namePage === enterNamePage)
  if(!nameRepeat){
    let newPage = {
      namePage: enterNamePage === '' ? 'Página' : enterNamePage,
      tareas: []
    }
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

  return (
    <section className="container-app">
          { /* Crear nueva pagina */ }
      { 
        formNewPage && <NewPage 
        createNewPage={createNewPage}
        setEnterNamePage={setEnterNamePage}
        enterNamePage={enterNamePage}
        pageRepeat={pageRepeat}
        setFormNewPage={setFormNewPage}
        />
      }
          { /* Header */ }
      <header>
        <img src={logo} alt="check, logo de la app" />
        <h1>Lista de Tareas</h1>
      </header>

          { /* botones todo y borrar */ }
      <nav className=''>
        <label><input type="checkbox" name="checkTodos" className="checkTodos" title="Selecciona todo"/>Todos</label>
        <span title="Eliminar">
          <button className="btn btn-delete" onClick={handleDelete}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>
          </button></span>
      </nav>

        { /* Botones para seleccionar la pagina */ }
      <div className="nav-add-page">
        {
          pages.map((e, key) => 
            <button className="btn-add-page" key={key} onClick={(e) => {setNamePage(e.target.textContent)}}>{e.namePage}</button>
          )
        }
        <button className="btn-add-page" onClick={() => {setFormNewPage(true)}}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-240h80v-120h120v-80H520v-120h-80v120H320v80h120v120ZM240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h320l240 240v480q0 33-23.5 56.5T720-80H240Zm280-520v-200H240v640h480v-440H520ZM240-800v200-200 640-640Z"/></svg>
        </button>
      </div>

        { /* Mostrar las tareas */ }
     <main className="lista-main">
          { 
          selectPage?.tareas?.length > 0 ? (
            selectPage.tareas.map((task) => (
              <div key={task.id} className="tareaContenedor">
                <input type="checkbox"  name="check tarea" data-check={task.id} />
                  <div>
                  { task.checked === true ?  <p style={{textDecoration:"line-through"}}>{task.task}</p> : <p>{task.task}</p>}
                  </div>
                <button className="btn" data-id={task.id} onClick={taskCompleted}>
                { task.checked === false ? <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#EA3323"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#75FB4C"><path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z"/></svg> }
                </button>
                <button className="btn" data-id={task.id} onClick={editTask}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
              </div>
            ))
          ) : (
            <p className="not-tasks">No hay tareas para esta página</p>
          )
          }
      </main>

          {/* ingresar nueva tarea */ }
      <nav className="input-text">   
        <form onSubmit={addNewTask}>   
          <input type="text" name="nuevoTexto" className="nuevoTexto"  value={inputTask} placeholder="Ingrese nueva tarea..." onChange={(e) => {setInputTask(e.target.value)}}/>
          <label>
          <input type="submit" name="new-task" value="" className="btn-input-submit"/>
          <div className="btn btn-add-task">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/></svg>
          </div>
          <input type="hidden" id="edit-id" />
          </label>
        </form>
      </nav> 
    </section>
  )
}

export default App