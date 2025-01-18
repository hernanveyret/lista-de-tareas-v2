import React, { useState, useEffect } from 'react';
import RenamePage from './RenamePage';

import './menuBtn.css';
const MenuBtn = ({setOnMenuBtn, onMenuBtn, pages, setPages, namePage, setNamePage, pageRepeat,setSelectPage}) => {
const [ $renamePage, set$RenamePage ] = useState(false);

  const deletePage = () => {
    setPages((prevPages) => {
      const updatedPages = prevPages.filter((page) => page.namePage !== onMenuBtn.target);
      if (updatedPages.length > 0) {
        setSelectPage(updatedPages[0]);
        setNamePage(updatedPages[0].namePage);
      } else {
        setSelectPage({ namePage: "", tareas: [] });
        setNamePage("");
      }
      return updatedPages;
    });
    setOnMenuBtn({ onoff: false, target: "" });
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