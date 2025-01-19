import React from 'react';

const CalcPage = ({selectPage, taskCompleted, editTask}) => {
  return (
    <div>
      <div className="tareaContenedor">
                <input type="checkbox"  name="check tarea"  className="checked-task"/>
                  <div style={{display:"flex", gap:"1rem", alignItems:"center"}}>
                  <p style={{width:"100%", border:"1px solid red", textAlign:"left"}}>yerba la que te guste a vos</p>
                  <button className="btn">+</button>
                  <p>2</p>
                  <button className="btn">-</button>
                  <p style={{backgroundColor:"white", color:"black", padding:".5rem"}}>$ 100000</p>
                  </div>
                <button className="btn"  onClick={taskCompleted}>X</button>
                <button className="btn"  onClick={editTask}>
                  <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M200-200h57l391-391-57-57-391 391v57Zm-80 80v-170l528-527q12-11 26.5-17t30.5-6q16 0 31 6t26 18l55 56q12 11 17.5 26t5.5 30q0 16-5.5 30.5T817-647L290-120H120Zm640-584-56-56 56 56Zm-141 85-28-29 57 57-29-28Z"/></svg>
                </button>
              </div>
    </div>
  )
}
export default CalcPage;