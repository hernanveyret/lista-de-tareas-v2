import React, { useState, useEffect } from 'react';

const RenameFolder = ({setOpenRename, openRename, container, setContainer}) => {
  const [ inputName, setInputName ] = useState('');
  const [ onRepeat, setOnRepeat ] = useState(null)
  const [ isHoverIcon, setIsHoverIcon ] = useState(false)
  
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
export default RenameFolder;