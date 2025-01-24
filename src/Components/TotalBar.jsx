import React, { useState } from 'react';
import './totalBar.css';

const TotalBar = (selectPage) => {
const total = []
selectPage.selectPage.tareas.forEach((task) => {
  total.push(task.cant*task.precioU)
})

const $totalProductos = selectPage.selectPage.tareas.reduce((e,i) => parseInt(e) + parseInt(i.cant), 0)
const $totalImporte = total.reduce((e,i) => e + i, 0);

  return (
    <div className="containerTotal">
      <p>Cant Total: {$totalProductos}</p>
      <p>Total: {$totalImporte.toLocaleString('es-AR', { style: 'currency', currency: 'ARS' })}</p>
    </div>
  )
}
export default TotalBar;