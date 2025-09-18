import React, { useState, useEffect } from 'react';
import EditSaldoDisponible from './EditSaldoDisponible';

import './totalBar.css';

const TotalBar = ({ selectPage, 
                    pages, 
                    setPages, 
                    saldoDisponible, 
                    setIsEditSaldo,
                    isEditSaldo
                  }) => {
  const [ nuevoSaldo, setNuevoSaldo ] = useState(null);
  const [ paginaSeleccionada, setPaginaSeleccionada ] = useState(null)
 
  const $totalProductos = selectPage.tareas.reduce((e, i) => Number(e) + Number(i.cant), 0);
  const $totalImporte = selectPage.tareas.reduce((e, i) => Number(e) + (parseFloat(i.cant) * parseFloat(i.precioU)), 0);
  const $saldoDisponible = selectPage.saldoDisponible

  useEffect(() => {    
    const currentPage = pages.find((page) => page.namePage === selectPage.namePage);
      
    if (currentPage && currentPage.totalImporte !== $totalImporte) {
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.namePage === selectPage.namePage
            ? { ...page, totalImporte: $totalImporte } 
            : page
        )
      );
    }
  }, [selectPage, $totalImporte, setPages]); 

  // Editar nuevo saldo
const editSaldoDisponible = () => {
  if(nuevoSaldo){
    const currentPage = pages.find((page) => page.namePage === paginaSeleccionada);
    setPages((prevPages) =>
        prevPages.map((page) =>
          page.namePage === paginaSeleccionada
            ? { ...page, saldoDisponible: nuevoSaldo } 
            : page
        )
    );
  }
  
      setIsEditSaldo(false);
      setPaginaSeleccionada(null);
      setNuevoSaldo(null)
};

  const red = {
    backgroundColor:'#dc3545',
    color: 'white'
  }
    const verde = {
    backgroundColor:'#2ecc71'
  }

  const gris = {
    backgroundColor:'#6c757d'
  }

  return (
    <div>   
    <div className="containerTotal">
      { isEditSaldo &&
        <EditSaldoDisponible
        setIsEditSaldo={setIsEditSaldo}
        setNuevoSaldo={setNuevoSaldo}
        nuevoSaldo={nuevoSaldo}
        editSaldoDisponible={editSaldoDisponible}
        />}
      <p>Cant Total: {$totalProductos}</p>
      <p>Total: {$totalImporte.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
    </div>
    { $saldoDisponible !== null &&
    <div 
    className="containerTotalDisponible"
    style={$saldoDisponible - $totalImporte === 0
      ? gris
      : $saldoDisponible - $totalImporte < 0
      ? red
      : verde
    }  
    >
      <p>Monto disponible: {($saldoDisponible - $totalImporte).toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
      <button 
        className="button edit"
        onClick={() =>{ 
          setIsEditSaldo(true);
          setPaginaSeleccionada(selectPage.namePage)
        }}
        /*onClick={() => editSaldoDisponible(selectPage.namePage)}*/
      >
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
    }
    </div>
  );
};

export default TotalBar;

// color saldo positivo #2ecc71
// color saldo negativo #dc3545
// color saldo cero #6c757d