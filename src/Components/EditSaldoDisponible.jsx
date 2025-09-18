import React, { useState, useEffect } from 'react';
import './editSaldoDisponible.css';

const EditSaldoDisponible = ({ setIsEditSaldo ,setNuevoSaldo, nuevoSaldo, editSaldoDisponible}) => {

  const [ cargar, setCargar ] = useState(false);
  const [error, setError] = useState(false); // nuevo estado para manejar el error

   useEffect(() => {
    if (!isNaN(nuevoSaldo) && nuevoSaldo !== '') {
      setCargar(true);
      setError(false);
    } else {
      setCargar(false);
      setError(true);
    }
  }, [nuevoSaldo]);

    const handleClose = () => {
    setError(false); // ocultar mensaje al cerrar
    setNuevoSaldo(''); // opcional: limpiar input al cerrar
    setIsEditSaldo(false);
  }

return (
  <div className='contenedor-saldo-disponible'>
    <div className='box-saldo-disponible'>
      <div 
        onClick={handleClose}
        className="btn-cancelar"
        >X
        </div>
      <form 
        onSubmit={(e) => {
            e.preventDefault();
            if (cargar) {
              editSaldoDisponible();
            }
          }} 
        className='form-edit-saldo'
      >
        <div>
        <input 
          type='text' 
          name="saldo" 
          placeholder='Editar saldo' 
          onChange={(e) => { setNuevoSaldo(e.target.value)}}
          />
         {error && <p className='errorEdit' id="errorNumberEdit">*Ingrese un número válido</p>}
         </div> 
         <button 
          className='btn-subit-edit-saldo'
          type='submit'>
          <svg xmlns="http://www.w3.org/2000/svg" 
            height="50px"
            viewBox="0 -960 960 960" 
            width="50px" 
            fill="black">
              <path d="M840-683v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h503l157 157Zm-60 27L656-780H180v600h600v-476ZM479.76-245q43.24 0 73.74-30.26 30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5ZM233-584h358v-143H233v143Zm-53-72v476-600 124Z"/>
          </svg>
        </button>
      </form>
    </div>

  </div>
)
}
export default EditSaldoDisponible;