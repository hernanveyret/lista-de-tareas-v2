import React from 'react';
import './barra.css';

const Barra = ({selectPage, taskCompleted, editCalcTask }) => {
  return (
    
      <div className="bar">
        <input type="checkbox" className="checkbox" />
        <span className="text">comprar muchas cosas</span>
        <input type="number" className="number-input" maxLength={2} placeholder="00" />
        <div className="price-box">
          <span className="price">$4000</span>
          <span className="value">$120000</span>
        </div>
        <button className="button delete">X</button>
        <button className="button edit">Editar</button>
      </div>
    
  );
};

export default Barra;
