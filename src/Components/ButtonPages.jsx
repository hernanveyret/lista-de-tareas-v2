import React from 'react';

const ButtonPages = ({pages, setNamePage, menuBtnPage}) => {
  return (
    <div className="nav-add-page">
    {
      pages.map((e, key) => 
        <button className="btn-add-page btn-select" key={key} onClick={(e) => {setNamePage(e.target.textContent)}}>
          {e.namePage}
          <span className="btn" onClick={menuBtnPage} data-name={e.namePage} id={e.id}>
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#FFFFFF"><path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z"/></svg>
          </span>
        </button>
      )
    }
   </div> 
  )
};
export default ButtonPages;