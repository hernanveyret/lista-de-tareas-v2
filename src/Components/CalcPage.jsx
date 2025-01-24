import React from 'react';
import './calcPage.css';

const CalcPage = ({selectPage, taskCompleted, editCalcTask }) => {
  return (
    <div>
      {selectPage?.tareas?.length > 0 ? (
        selectPage.tareas.map((task) => (
          <div key={task.id} className="bar">
            <input
              type="checkbox"
              className="checkbox checked-task"
              name="check tarea"
              data-check={task.id}
            />
            <span className="text" style={{ textDecoration: task.checked ? 'line-through' : 'none' }}>
              {task.text}
            </span>
            <span className="number-input">
              {task.cant}
            </span>
            <div className="price-box">
              <span className="price">{parseFloat(task.precioU).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
              <span className="value">{(task.precioU * task.cant).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</span>
            </div>
            <button className="button delete" data-id={task.id} onClick={taskCompleted}>
              {task.checked === false ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="red"
                >
                  <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="24px"
                  viewBox="0 -960 960 960"
                  width="24px"
                  fill="#75FB4C"
                >
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </svg>
              )}
            </button>
            <button className="button edit" data-id={task.id} onClick={editCalcTask}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="black"
              >
                <path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z" />
              </svg>
            </button>
          </div>
        ))
      ) : (
        <p className="not-tasks">No hay tareas para esta página</p>
      )}
    </div>
  );
};

export default CalcPage;