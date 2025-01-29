import React, { useState } from 'react';
import './almanaque.css';


const Almanac = ({setOnAlmanac}) => {
  const fecha = new Date();
  const year = fecha.getFullYear(); // año
  const meses = [
    {id: 0, mes: "Enero"},
    {id: 1, mes: "Febrero"},
    {id: 2, mes: "Marzo"},
    {id: 3, mes: "Abril"},
    {id: 4, mes: "Mayo"},
    {id: 5, mes: "Junio"},
    {id: 6, mes: "Julio"},
    {id: 7, mes: "Agosto"},
    {id: 8, mes: "Septiembre"},
    {id: 9, mes: "Octubre"},
    {id: 10, mes: "Noviembre"},
    {id: 11, mes: "Diciembre"},
  ]

  const [day, setDay] = useState(fecha.getDate()); // dia en numero.
  const [dayString, setDayString] = useState(fecha.toLocaleString('es-ES', {weekday: 'long'}));
  const [month, setMonth] = useState(fecha.getMonth()); // mes en numero.
  const [monthString, setMonthString] = useState(meses.find(m => m.id === month).mes)
  const [cantDiasMes, setCantDiasMes] = useState(new Date(year, month + 1, 0).getDate()); // Ultimo dia del mes anterior
  const [celdasVacias, setCeldasVacias] = useState(new Date(year, month, 1).getDay()) // Posicion del primer dia del mes, del 0 al 6, dom-lun...
  

  let days = []
  let cells = []
  let rows = []
  let diasDelMes = 0

    // Mes anterior
    const handlePrev = () => {
      month === 0 ? setMonth(0) : setMonth(month - 1);
      console.log('mes anterior')
    }
      //Mes siguiente
  const handleNext = () => {
    month === 11 ? setMonth(11) : setMonth(month + 1);
    console.log('mes siguiente')
  }
    // Selecciona el dia en el almanaque por mes.
  // el metodo trim() elimina los espacios vacios de lo que traiga el target
  const handleDay = (e) => {
    let textContent = e.currentTarget.textContent.trim();
    if (textContent !== '') {
      textContent = parseInt(textContent)
      setDay(textContent)
    }
  };

  // crea un array con la cantidad de dias que tiene el mes actual.
  for(let i=1; i <= cantDiasMes; i++){
    days.push(i)
  }

  // agrega las celdas vacias
  for (let i=1; i <= celdasVacias; i++){
    cells.push(<td key={`vacias-${i}`} onClick={handleDay}></td>)
  }
  // Crea la primera fila con las vacias y las que tienen numero.
  for(let i=1; i<= 7-celdasVacias; i++){
    diasDelMes++
    day === diasDelMes ? cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange",borderRadius:"5px", cursor:"pointer"}} onClick={handleDay}>{diasDelMes}</td>) : cells.push(<td key={`day-${diasDelMes}`} onClick={handleDay} style={{cursor:"pointer"}}>{diasDelMes}</td>)
  }
    rows.push(<tr key={`row-1`}>{cells}</tr>)

  for(let filas = 1; filas <= 6; filas++){
    cells = []
      for(let celdas = 1; celdas <= 7; celdas++){
        if ( diasDelMes >= cantDiasMes){
          cells.push(<td key={`empty-${filas}-${celdas}`}></td>);
      }else{  
        diasDelMes++
        day === diasDelMes ? cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange",borderRadius:"5px", cursor:"pointer"}} onClick={handleDay}>{diasDelMes}</td>) : cells.push(<td key={`day-${diasDelMes}`} onClick={handleDay} style={{cursor:"pointer"}}>{diasDelMes}</td>)
      }
      }
      rows.push(<tr key={`row-${filas + 1}`}>{cells}</tr>)
  }

  return (
    <div className="containerAlmanac">
    
      <section className="alamanaque">
      <button className="btn btn-close-alamanac" onClick={() => {setOnAlmanac(false)}}>
            <svg xmlns="http://www.w3.org/2000/svg" 
            height="24px" 
            viewBox="0 -960 960 960" 
            width="24px" fill="#000">
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
          </button>
          { <div className="caption">
            { month === 0 ? <button className="btn-mes btn-prev" onClick={handlePrev} style={{display:"none"}} title="Mes anterior">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </button> : <button className="btn-mes btn-prev" onClick={handlePrev} title="Mes anterior">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </button> }
            {day} de {monthString} de {year}
            { month === 11 ? <button className="btn-mes btn-next" onClick={handleNext} style={{display:"none"}} title="Mes siguiente">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </button> : <button className="btn-mes btn-next" onClick={handleNext} title="Mes siguiente">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </button> }
          </div>}
      <table border="0">
        <thead>
        <tr>
          <th>Do</th>
          <th>Lu</th>
          <th>Ma</th>
          <th>Mi</th>
          <th>Ju</th>
          <th>Vi</th>
          <th>Sa</th>
        </tr>
      </thead>
      <tbody>
        { rows }
      </tbody>
      </table>
      <div className="msj-hs">
       { /*
         <p>De 00hs a 8:30hs</p>
         <p>Ver día anterior</p> 
         */
       } 
        
      </div>
      </section>
    </div>
  );
}

export default Almanac;

