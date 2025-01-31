import React from 'react';
import './newPage.css'

const NewPage = ({createNewPage,setEnterNamePage,enterNamePage,pageRepeat,setFormNewPage}) => {

  return (
    <div className='container-new-page'>
      <section className="section">
      <button className="btn close-create-page" onClick={() => setFormNewPage(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="black"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>
        { pageRepeat ?  <h3 style={{color:"red", textShadow:"2px 2px 3px black"}}>* El nombre ya existe</h3>:<h3>Ingrese nombre de página</h3>}
        <form onSubmit={createNewPage} className="form-new-page">
          <input type='text' name="name" value={enterNamePage} onChange={(e) => {setEnterNamePage(e.target.value)}} className="inputText" autoFocus/>
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
export default NewPage;