import React from 'react';
import './menuBtn.css';
const MenuBtn = ({setOnMenuBtn, onMenuBtn, pages, setPages, namePage, setNamePage}) => {

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

  const renamePage = () => {
    let paginas = pages.find(e => {
      if(e.namePage === onMenuBtn.target){
        return e
      }
    })
    console.log(paginas)
    console.log('renombrar pagina')
  }
    

  return (
    <div className="container-menu-btn">
      <div className="container-btn">
        <button onClick={deletePage}>Eliminar</button>
        <button onClick={renamePage}>Renombrar</button>
        <button onClick={() => {setOnMenuBtn({onoff:false, target:''})}}>Cancelar</button>
      </div>
    </div>
  )
}
export default MenuBtn;