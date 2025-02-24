import React, { useEffect, useState } from 'react';
import './almanaque.css';


const Almanac = ({setOnAlmanac}) => {
  const feriados = [
    { "id": 1, "mes": "enero", "dia": 1, "feriado": "1 - Año Nuevo", noLaborable: false },
    { "id": 2, "mes": "marzo", "dia": 3, "feriado": "3 - Carnaval" , noLaborable: false},
    { "id": 3, "mes": "marzo", "dia": 4, "feriado": "4 - Carnaval" , noLaborable: false},
    { "id": 4, "mes": "marzo", "dia": 24, "feriado": "24 - Día Nacional de la Memoria por la Verdad y la Justicia" , noLaborable: false},
    { "id": 5, "mes": "abril", "dia": 2, "feriado": "2 - Día del Veterano y de los Caídos en la Guerra de Malvinas", noLaborable: false },
    { "id": 6, "mes": "abril", "dia": 18, "feriado": "18 - Viernes Santo", noLaborable: false },
    { "id": 7, "mes": "mayo", "dia": 1, "feriado": "1 - Día del Trabajador", noLaborable: false },
    { "id": 8, "mes": "mayo", "dia": 2, "feriado": "2 - Día no laborable con fines turísticos", noLaborable: true },
    { "id": 9, "mes": "mayo", "dia": 25, "feriado": "25 - Día de la Revolución de Mayo" , noLaborable: false},
    { "id": 10, "mes": "junio", "dia": 20, "feriado": "20 - Paso a la Inmortalidad del General Manuel Belgrano" , noLaborable: false},
    { "id": 11, "mes": "julio", "dia": 9, "feriado": "9 - Día de la Independencia", noLaborable: false },
    { "id": 12, "mes": "agosto", "dia": 15, "feriado": "15 - Día no laborable con fines turísticos" , noLaborable: true},
    { "id": 13, "mes": "agosto", "dia": 17, "feriado": "17 - Paso a la Inmortalidad del General José de San Martín" , noLaborable: false},
    { "id": 14, "mes": "octubre", "dia": 12, "feriado": "12 - Día del Respeto a la Diversidad Cultural" , noLaborable: false},
    { "id": 15, "mes": "noviembre", "dia": 21, "feriado": "21 - Día no laborable con fines turísticos", noLaborable: true},
    { "id": 16, "mes": "diciembre", "dia": 8, "feriado": "8 - Día de la Inmaculada Concepción de María" , noLaborable: false},
    { "id": 17, "mes": "diciembre", "dia": 25, "feriado": "25 - Navidad", noLaborable: false }
  ]
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
  const [toDay, setToDay ] = useState(fecha.getDate());
  const [dayString, setDayString] = useState(fecha.toLocaleString('es-ES', {weekday: 'long'}));
  const [month, setMonth] = useState(fecha.getMonth()); // mes en numero.
  const [monthString, setMonthString] = useState(meses.find(m => m.id === month).mes)
  const [cantDiasMes, setCantDiasMes] = useState(new Date(year, month + 1, 0).getDate()); // Ultimo dia del mes anterior
  const [celdasVacias, setCeldasVacias] = useState(new Date(year, month, 1).getDay()) // Posicion del primer dia del mes, del 0 al 6, dom-lun...
  const [ showFeriados, setShowFeriados ] = useState([])
  //const [ currentDay, setCurrentDay ] = useState(0);

  let days = []
  let cells = []
  let rows = []
  let diasDelMes = 0
  

  if(cantDiasMes < day ){  
    setDay(cantDiasMes)
  }

    // Mes anterior
    const handlePrev = () => {
      month === 0 ? setMonth(0) : setMonth(month - 1);
    }
      //Mes siguiente
  const handleNext = () => {
    month === 11 ? setMonth(11) : setMonth(month + 1);
  
  }
  // recalcula los estados para pasar o volver de mes.
  useEffect(() => {
    setCantDiasMes(new Date(year, month + 1, 0).getDate()); 
    setCeldasVacias(new Date(year, month, 1).getDay());
    setMonthString(meses.find(m => m.id === month).mes);
  }, [month, year]); 
  
  const getFeriadoMes = feriados.filter(dia => dia.mes === monthString[0].toLowerCase() + monthString.slice(1))
  
  // crea un array con la cantidad de dias que tiene el mes actual.
  for(let i=1; i <= cantDiasMes; i++){
    days.push(i)
  
  }

  // agrega las celdas vacias
  for (let i=1; i <= celdasVacias; i++){
    cells.push(<td key={`vacias-${i}`}></td>)   
  }

  // Crea la primera fila con las vacias y las que tienen numero.
  for(let i=1; i<= 7-celdasVacias; i++){
    diasDelMes++    
    const trueDay = getFeriadoMes.find(dia => Number(dia.dia) === Number(diasDelMes))

    new Date === diasDelMes 
      ? 
        cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange",borderRadius:"5px"}} >{diasDelMes}</td>) 
      :
       trueDay 
       ? 
        diasDelMes === Number(trueDay.dia) 
        ?
        cells.push(<td key={`day-${diasDelMes}`}  style={trueDay.noLaborable ? { backgroundColor:'green', color:'white'}: { backgroundColor:'black', color:'white'}}>{diasDelMes}</td>)
        : 
        cells.push(<td key={`day-${diasDelMes}`}>{diasDelMes}</td>)   
      :
      cells.push(<td key={`day-${diasDelMes}`}>{diasDelMes}</td>)
  }
    rows.push(<tr key={`row-1`}>{cells}</tr>)

    for(let filas = 1; diasDelMes < cantDiasMes; filas++) {      
      cells = []
      for(let celdas = 1; celdas <= 7 && diasDelMes < cantDiasMes; celdas++) {
         diasDelMes++
        const trueDay = getFeriadoMes.find(dia => Number(dia.dia) === Number(diasDelMes))        
        day === diasDelMes 
          ?
          cells.push(<td key={`day-${diasDelMes}`} style={{backgroundColor: "orange", borderRadius:"5px"}} >{diasDelMes}</td>) 
          :           
            trueDay 
            ? 
             diasDelMes === Number(trueDay.dia) 
              ?                
               cells.push(<td key={`day-${diasDelMes}`}  style={trueDay.noLaborable ? { backgroundColor:'green', color:'white'}: { backgroundColor:'black', color:'white'}}>{diasDelMes}</td>)
              :
              cells.push(<td key={`day-${diasDelMes}`}>{diasDelMes}</td>)   
            :
          cells.push(<td key={`day-${diasDelMes}`}>{diasDelMes}</td>)
      }
      rows.push(<tr key={`row-${filas + 1}`}>{cells}</tr>)
    }    

    const getFeriados = feriados.filter(feriado => feriado.mes === monthString[0].toLowerCase() + monthString.slice(1) );

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
            { month === 0 ? <button className="btn-mes btn-prev" onClick={handlePrev} style={{display:"none", cursor:'pointer'}} title="Mes anterior">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </button> : <button className="btn-mes btn-prev" onClick={handlePrev} title="Mes anterior" style={{cursor:'pointer'}}>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M560-240 320-480l240-240 56 56-184 184 184 184-56 56Z"/></svg>
            </button> }
            {day} de {monthString} de {year}
            { month === 11 ? <button className="btn-mes btn-next" onClick={handleNext} style={{display:"none",cursor:'pointer'}} title="Mes siguiente">
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#5f6368"><path d="M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z"/></svg>
            </button> : <button className="btn-mes btn-next" onClick={handleNext} title="Mes siguiente" style={{cursor:'pointer'}}>
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
       <div style={{marginLeft: '20px', marginBottom:'10px'}}>
       { getFeriados && 
          getFeriados.map((feriado => (
            <p key={feriado.id}>{feriado.feriado}</p>
          )))
        }
       </div>
      </section>
    </div>
  );
}

export default Almanac;

