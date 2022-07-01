import React from 'react'
import Footer from '../../navegation/footer/Footer'
import Navbar1 from '../../navegation/navbar/Navbar1'
import Fancybox from '../../pages/Investigadores/fancybox'

const Investigadores = () => {
  return (
    <div>
        <Navbar1/>
        <Fancybox>
        <div className='box-fancy'>
        <div data-Fancybox="dialog" data-src="#dialog-content">
          <img
            alt=""
            src="https://lipsum.app/id/33/200x150"
          />
          <h2>Putos</h2>
        </div>
        <div id="dialog-content" style={{ display: "none", maxWidth: "500px" }}>
          <h2>Hello, world!</h2>
          <p>
            <input type="text" value="" />
          </p>
          <p>
            Try hitting the tab key and notice how the focus stays within the
            dialog itself.
          </p>
          <p>
            To close dialog hit the esc button, click on the overlay or just
            click the close button.
          </p>
          <p className="margin-bottom--none">
            Element used to launch the modal would receive focus back after
            closing.
          </p>
        </div>
        </div>
      </Fancybox>
        <Footer/>
    </div>
  )
}

export default Investigadores