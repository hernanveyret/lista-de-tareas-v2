import React, { useState, useEffect } from 'react';
import Confirm from './Confirm';
import RenamePage from './RenamePage';

import './menuBtn.css';
const MenuBtn = ({setOnMenuBtn, onMenuBtn, pages, setPages, namePage, setNamePage, pageRepeat,setSelectPage,taskOrPage, confirm, setConfirm, setFolder, folder}) => {
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
    setConfirm(false)
  }

  return (
    <div className="container-menu-btn">
      { confirm && <Confirm setConfirm={setConfirm} taskOrPage={taskOrPage} deletePage={deletePage} onMenuBtn={onMenuBtn.target}/>}
     
      <div className="container-btn-menu">
        <button onClick={(e) => 
          {
            setFolder({...folder, openMenu: true }) 
            setOnMenuBtn({onoff:false, target:onMenuBtn.target}) 
          }
            } 
            data-name={onMenuBtn.target}>
              Guardar
        </button>
        <button onClick={() => setConfirm(true)}>Eliminar</button>
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
        setNamePage={setNamePage}
      /> }
    </div>
  )
}
export default MenuBtn;