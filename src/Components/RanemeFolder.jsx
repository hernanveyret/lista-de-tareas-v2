import React, { useState, useEffect } from 'react';

const RenameFolder = ({setOpenRename, openRename, container, setContainer}) => {
  const [ inputName, setInputName ] = useState('');
  const [ onRepeat, setOnRepeat ] = useState(null)
  
  const rename = (e) => {
    e.preventDefault()
    let editName = inputName ? String(inputName)[0].toUpperCase() + String(inputName).slice(1) : `Pagina ${pages.length + 1}`    
    let repeatName = container.find(folder => folder.folderName === editName)
    if(!repeatName){
      let newName =  container.map(folder => {
        if(folder.id === parseInt(openRename.id)){
          return  {
            ...folder, 
            folderName: editName
          } ;       
        }
        return folder;
      });
      setContainer(newName)
      setOpenRename({
        onOf:false,
        id:''
      })
    }else{
      setOnRepeat(true)
      setInputName('')
    }
  }

  
  return (
    <div className='container-new-page'>
      <section className="section">
      <button className="btn clase-create-page" onClick={(e) => setOpenRename({ onOf: false, id:'' })}>
        <svg xmlns="http://www.w3.org/2000/svg" 
        height="24px" 
        viewBox="0 -960 960 960" 
        width="24px" 
        fill="black">
          <path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>      
      { onRepeat ?  <h3 style={{fontSize:"1rem",color:"red", textShadow:"2px 2px 3px black"}}>* El nombre ya existe</h3>:<h3>Ingrese nuevo nombre.</h3>}
      <form onSubmit={rename}>
       <input type="text" value={inputName} onChange={(e) => { setInputName(e.target.value)}} className="inputText" autoFocus/>
       <label>
          <input type="submit" />
            <span>
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
export default RenameFolder;