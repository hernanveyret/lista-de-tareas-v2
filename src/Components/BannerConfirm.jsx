import React from 'react';
import './bannerConfirm.css'

const BannerConfirm = ({text}) => {
  console.log('hola')
  return (
    <section className="container-shared">
      <div className="container-shared-text" style={{backgroundColor: text.colorFondo, color:text.colorText}}>
        <p>{text.text}</p>
      </div>
    </section>
  )
}
export default BannerConfirm;