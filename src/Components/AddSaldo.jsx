import React, { useState, useEffect } from 'react';
import './editSaldoDisponible.css';

const AddSaldo = ({ 
                    setIsAddSaldo, 
                    setSaldo,
                    saldo,
                    pages,
                    setPages,
                    namePage
                  }) => {

  const [ cargarSaldo, setCargarSaldo ] = useState(false);
  const [error, setError] = useState(false); // nuevo estado para manejar el error

  
   useEffect(() => {
    if (!isNaN(saldo) && saldo !== '') {
      setCargarSaldo(true);
      setError(false);
    } else {
      setCargarSaldo(false);
      setError(true);
    }
  }, [saldo]);

  
    const handleClose = () => {
    setError(false); // ocultar mensaje al cerrar
    setSaldo(''); // opcional: limpiar input al cerrar
    setIsAddSaldo(false)
  }

  const agregarSaldo = () => {
  if (saldo) {
    setPages((prevPages) =>
      prevPages.map((page) =>
        page.namePage === namePage
          ? {
              ...page,
              saldoDisponible: saldo, // si ya existe, lo pisa; si no, lo crea
            }
          : page
      )
    );
  }
  setError(false); // ocultar mensaje al cerrar
    setSaldo(''); // opcional: limpiar input al cerrar
    setIsAddSaldo(false)
};

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
            if (cargarSaldo) {
              agregarSaldo();
            }
          }} 
        className='form-edit-saldo'
      >
        <div>
        <input 
          type='text' 
          name="saldo" 
          placeholder='Ingrese su Saldo' 
          onChange={(e) => { setSaldo(e.target.value)}}
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
export default AddSaldo;