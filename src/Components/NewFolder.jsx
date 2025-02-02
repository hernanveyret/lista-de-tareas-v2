import react, { useState, useEffect } from 'react';
import './newFolder.css'
const NewFolder = ({setOnInputFolder, container, setContainer}) => {
const [nombreCarpeta, setNombrecarpeta ] = useState('')

//setContainer((prevContainer) => [ ...prevContainer, {folderName:nombreCarpeta, tasks: pageSelect}])

const createNewFolder = (e) => {
  e.preventDefault();
  console.log("CREAR CARPETA", nombreCarpeta);
  setContainer((prevContainer) => [
    ...prevContainer,
    { id: Date.now(),folderName: nombreCarpeta, tareas: [] },
  ]);
  setOnInputFolder(false); 
};

useEffect(() => {
  console.log(container)
},[container])

  return (
    <div className='container-new-folder'>
      <section className="section">
        <button className="btn close-create-page">
          <svg xmlns="http://www.w3.org/2000/svg" 
          height="24px" 
          viewBox="0 -960 960 960" 
          width="24px" 
          fill="black"
          onClick={() => {setOnInputFolder(false)}}
          >
            <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
            </svg>
        </button>
          <h3>Ingrese nombre de carpeta.</h3>
          <form  className="form-new-page" onSubmit={createNewFolder}>
            <input type='text' name="name"  className="inputText" onChange={(e) => { setNombrecarpeta(e.target.value)}} autoFocus/>
            <label>
              <input type="submit" />
                <span className="btn-save">
                <svg xmlns="http://www.w3.org/2000/svg" 
                  height="40px"
                  viewBox="0 -960 960 960" 
                  width="40px" 
                  fill="black">
                    <path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/>
                </svg>
                </span>
            </label>
          </form>
      </section>
    </div>
  )
}
export default NewFolder;