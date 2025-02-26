import React, {useState} from 'react';
import './newPage.css'

const NewPage = ({createNewPage,setEnterNamePage,enterNamePage,pageRepeat,setFormNewPage}) => {
  const [ isHoverIcon, setIsHoverIcon ] = useState(false)

  return (
    <div className='container-new-page'>
      <section className="section">
      <button className="btn close-create-page" onClick={() => setFormNewPage(false)} title='Cancelar'>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
        { pageRepeat ?  <h3 style={{color:"red", textShadow:"2px 2px 3px black"}}>* El nombre ya existe</h3>:<h3>Ingrese nombre de página</h3>}
        <form onSubmit={createNewPage} className="form-new-page">
          <input type='text' name="name" value={enterNamePage} onChange={(e) => {setEnterNamePage(e.target.value)}} className="inputText" autoFocus/>
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
export default NewPage;