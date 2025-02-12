import React, { useEffect } from 'react';
import './totalBar.css';

const TotalBar = ({ selectPage, pages, setPages }) => {
  
  const $totalProductos = selectPage.tareas.reduce((e, i) => Number(e) + Number(i.cant), 0);
  const $totalImporte = selectPage.tareas.reduce((e, i) => Number(e) + (parseFloat(i.cant) * parseFloat(i.precioU)), 0);

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
  }, [selectPage, $totalImporte, setPages]); // 

  return (
    <div className="containerTotal">
      <p>Cant Total: {$totalProductos}</p>
      <p>Total: {$totalImporte.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
    </div>
  );
};

export default TotalBar;
