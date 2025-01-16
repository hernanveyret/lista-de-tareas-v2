import React, { useState, useEffect } from 'react';

const RenamePage = ({set$RenamePage,pages,setPages,onMenuBtn,setOnMenuBtn}) => {
  const [ inputText, setInputText ] = useState('');
  
  const [ onRepeatName, setOnRepeatName ] = useState(false)

  const editPages = (e) => {
    e.preventDefault()
    let nameRepeat = pages.find(e => e.namePage === inputText)
    if(!nameRepeat){
      setPages((prevPages) =>
        prevPages.map((page) =>
          page.namePage === onMenuBtn.target
            ? { ...page, namePage: inputText }
            : page
        )
      );
      setOnMenuBtn({ onoff: false, target: '' });
      set$RenamePage(false);
    }else{
      setOnRepeatName(true)
      setInputText('')
    }
      
   }

  return (
    <div className='container-new-page'>
      <section className="section">
      <button className="btn clase-create-page" onClick={() => set$RenamePage(false)}>
        <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg>
      </button>      
      { onRepeatName ?  <h3 style={{fontSize:"1rem",color:"red", textShadow:"2px 2px 3px black"}}>* El nombre ya existe</h3>:<h3>Ingrese nuevo nombre</h3>}
      <form onSubmit={editPages}>
       <input type="text" value={inputText} onChange={(e) => { setInputText(e.target.value)}}/>
       <label>
            <input type="submit" />
              <span>
              <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M840-680v480q0 33-23.5 56.5T760-120H200q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h480l160 160Zm-80 34L646-760H200v560h560v-446ZM480-240q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35ZM240-560h360v-160H240v160Zm-40-86v446-560 114Z"/></svg>
              </span>
          </label>
      </form>
        
      </section>
    </div>
  )
}
export default RenamePage;