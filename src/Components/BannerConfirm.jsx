import React from 'react';
import './BannerConfirm.css'

const BannerConfirm = ({text}) => {
  return (
    <section className="container-shared">
      <div className="container-shared-text" style={{backgroundColor: text.colorFondo, color:text.colorText}}>
        <p>{text.text}</p>
      </div>
    </section>
  )
}
export default BannerConfirm;