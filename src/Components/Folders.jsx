import React,{ useState,useEffect } from 'react';
import ArrowDown from './ArrowDown';
import ArrowUp from './ArrowUp'
import './folders.css'

const Folders = ({folder, addToFolder, editNameFolder ,deleteFolder, deleteTask, openPage, restorePage, openMenu, openMenuPage, openTaskInFolder, setIsHoverIcons, isHoverIcons}) => {
 
  return (
  <> 
   <nav data-id={folder.id}>
    <span className="container-name">
      <p>{folder.folderName[0].toUpperCase() + folder.folderName.slice(1)}</p>
    </span>
    <span className="container-btn-folder">
    <button className='btn' onClick={(addToFolder)} data-id={folder.id} title="Guardar"
      onMouseEnter={() => {setIsHoverIcons({action:'hoverGuardarTrue',id:folder.id})}}
      onMouseLeave={() => {setIsHoverIcons({action:'hoverGuardarFals',id:''})}}
    >
      {
        isHoverIcons.action === 'hoverGuardarTrue' && isHoverIcons.id === folder.id ?
        <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="white">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
        </svg>
        :
        <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="#000000">
            <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z"/>
      </svg>
      }      
      <p>Guardar</p>
    </button>
    <button className='btn' onClick={editNameFolder} data-id={folder.id} title="Editar nombre"
    onMouseEnter={() => {setIsHoverIcons({action:'hoverEditarTrue',id:folder.id})}}
    onMouseLeave={() => {setIsHoverIcons({action:'hoverEditarFalse',id:''})}}
    >
      {
        isHoverIcons.action === 'hoverEditarTrue' && isHoverIcons.id === folder.id ?
        <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" fill="#FFFFFF">
          <path d="M120-120v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm584-528 56-56-56-56-56 56 56 56Z"/>
        </svg>
        :
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="black">
            <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/>
        </svg>
      }
      
      <p>Editar</p>
    </button>    
    <button className='btn' onClick={deleteFolder} data-id={folder.id} title="Borrar"
    onMouseEnter={() => {setIsHoverIcons({action:'hoverBorrarTrue',id:folder.id})}}
    onMouseLeave={() => {setIsHoverIcons({action:'hoverBorrarFalse',id:''})}}
    >
      {
        isHoverIcons.action === 'hoverBorrarTrue' && isHoverIcons.id === folder.id ?
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
    <button className='btn' onClick={openPage} data-id={folder.id}> 
    { openMenu === folder.id ? <ArrowUp /> : <ArrowDown /> }
    </button>
    </span>
   </nav>
    <div className="container-folder-task"  id={folder.id}>    
      {
        folder.tareas.map((task,index) => (   
          <div className="list-task" key={index} data-id={task.namePage} >
            <div className="title">
              <div className="title-title"><p>{task.namePage}</p></div>
              <div className="containertitle-btn">
              <button className="btn" title="Retornar a la lista" onClick={restorePage} data-nombre={task.namePage} data-id={folder.id}
                onMouseEnter={() => {setIsHoverIcons({action:'hoverRestoreTrue', nombre:task.namePage})}}
                onMouseLeave={() => {setIsHoverIcons({action:'hoverRestoreFalse',id:''})}}
              >
                {
                  isHoverIcons.action === 'hoverRestoreTrue' && isHoverIcons.nombre === task.namePage ?
                  <svg xmlns="http://www.w3.org/2000/svg" 
                  height="24px" 
                  viewBox="0 -960 960 960" 
                  width="24px" 
                  fill="green">
                    <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
                </svg>
                :
                <svg xmlns="http://www.w3.org/2000/svg" 
                height="24px" 
                viewBox="0 -960 960 960" 
                width="24px" 
                fill="#000000">
                  <path d="M280-200v-80h284q63 0 109.5-40T720-420q0-60-46.5-100T564-560H312l104 104-56 56-200-200 200-200 56 56-104 104h252q97 0 166.5 63T800-420q0 94-69.5 157T564-200H280Z"/>
              </svg>
                }                
                <p>Restaurar</p>
                </button>
              <button className="btn" title="Borrar" onClick={(e)=>deleteTask(e,'borro')} data-nombre={task.namePage} data-id={folder.id}
               onMouseEnter={() => {setIsHoverIcons({action:'hoverBorrarPageTrue',nombre: task.namePage})}}
               onMouseLeave={() => {setIsHoverIcons({action:'hoverBorrarPageFalse',id:''})}}
               >
                 {
                   isHoverIcons.action === 'hoverBorrarPageTrue' && isHoverIcons.nombre === task.namePage ?
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
              </div>
              <div className="container-total">            
              {task.totalImporte && <p style={{textAlign:'center'}}><span style={{color: '#FC4B08'}}>Total</span> {Number(task.totalImporte).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>}
              </div>
              <button className='task-btn' onClick={openTaskInFolder} data-id={task.namePage}>
              { openMenuPage === task.namePage ? <ArrowUp /> : <ArrowDown />  }
              </button>
            </div>
             {
             task.tareas.map((tareas, index) => (
              <div className="task" key={index}>
                <div className="task-info">
                  <p style={{fontWeight:'bold'}}>{tareas.text || tareas.task}</p>
                  { tareas.cant > 0 ? <p>Cantidad: {tareas.cant }</p> : '' }
                  { tareas.precioU > 0 ? <p>Precio U.: {tareas.precioU && parseFloat(tareas.precioU).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }</p>: ''}
                  <p>{tareas.precioU > 0 ?  `Total: ${(parseFloat(tareas.precioU) * parseInt(tareas.cant)).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' }) }`: ''}</p>
                </div>
                <div className="task-checked">
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
              </div>
             ))
             } 
          </div>
      ))
    }
   { folder.finalImporte ?
     <p style={{color:'#002E52', fontWeight:'bold'}}>Total General {Number(folder.finalImporte).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
     :
     ''
   } 
    </div>
   </>
  )
}
export default Folders;