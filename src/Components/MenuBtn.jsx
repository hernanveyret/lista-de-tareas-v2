import React, { useState } from 'react';
import RenamePage from './RenamePage';

import './menuBtn.css';
const MenuBtn = ({setOnMenuBtn, onMenuBtn, pages, setPages, namePage, setNamePage, pageRepeat}) => {
const [ $renamePage, set$RenamePage ] = useState(false);
  console.log(namePage)

  const deletePage = () => {
    let paginas = pages.filter(e => {
      if(e.namePage != onMenuBtn.target){
        return e
      }
    })
    setPages(paginas)
    setNamePage('')
    setOnMenuBtn({onoff:false, target:''})
  }
  
  return (
    <div className="container-menu-btn">
      <div className="container-btn">
        <button onClick={deletePage}>Eliminar</button>
        <button onClick={() => { set$RenamePage(true)}}>Renombrar</button>
        <button onClick={() => {setOnMenuBtn({onoff:false, target:''})}}>Cancelar</button>
      </div>
      { $renamePage && <RenamePage 
        set$RenamePage={set$RenamePage}
        pageRepeat={pageRepeat}
        pages={pages}
        setPages={setPages}
        onMenuBtn={onMenuBtn}
        setOnMenuBtn={setOnMenuBtn}
        namePage={namePage}
      /> }
    </div>
  )
}
export default MenuBtn;