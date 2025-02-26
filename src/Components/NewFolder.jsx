import react, { useState, useEffect } from 'react';
import './newFolder.css'
const NewFolder = ({setOnInputFolder, container, setContainer}) => {
const [nombreCarpeta, setNombrecarpeta ] = useState('')
const [ isHoverIcon, setIsHoverIcon ] = useState(false)

const createNewFolder = (e) => {
  e.preventDefault();
  setContainer((prevContainer) => [
    ...prevContainer,
    { id: Date.now(),folderName: nombreCarpeta, tareas: [] },
  ]);
  setOnInputFolder(false); 
};

  return (
    <div className='container-new-folder'>
      <section className="section">
        <button className="btn close-create-page" title="Cancelar">
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
                <span className="btn-save" title='Guardar'
                onMouseEnter={() => {setIsHoverIcon(true)}}
                onMouseLeave={() => {setIsHoverIcon(false)}}
                >
                  {
                    isHoverIcon ? 
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      height="50px"
                      viewBox="0 -960 960 960" 
                      width="50px" 
                      fill="white">
                        <path d="M840-683v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h503l157 157Zm-60 27L656-780H180v600h600v-476ZM479.76-245q43.24 0 73.74-30.26 30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5ZM233-584h358v-143H233v143Zm-53-72v476-600 124Z"/>
                    </svg>
                    :
                    <svg xmlns="http://www.w3.org/2000/svg" 
                      height="50px"
                      viewBox="0 -960 960 960" 
                      width="50px" 
                      fill="black">
                        <path d="M840-683v503q0 24-18 42t-42 18H180q-24 0-42-18t-18-42v-600q0-24 18-42t42-18h503l157 157Zm-60 27L656-780H180v600h600v-476ZM479.76-245q43.24 0 73.74-30.26 30.5-30.27 30.5-73.5 0-43.24-30.26-73.74-30.27-30.5-73.5-30.5-43.24 0-73.74 30.26-30.5 30.27-30.5 73.5 0 43.24 30.26 73.74 30.27 30.5 73.5 30.5ZM233-584h358v-143H233v143Zm-53-72v476-600 124Z"/>
                    </svg>
                  }                
                </span>
            </label>
          </form>
      </section>
    </div>
  )
}
export default NewFolder;