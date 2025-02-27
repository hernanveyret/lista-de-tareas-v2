import React from 'react';
import imagen from '../assets/img/basuraAnimacion.gif';
import './animacionDelete.css'

const AnimacionDelete = () => {
  return (
    <div className="container-animacion-delete">
      <img src={imagen} alt='Animacion de tachito de basura' />
    </div>
  )
}
export default AnimacionDelete;