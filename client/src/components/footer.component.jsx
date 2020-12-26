import React from 'react'
import logo from '../assets/images/icons8-cannabis-100.png'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className="logo-box">
                <div className="logo"><img src={logo} alt='weblogo'/> </div>
                <div className="app-name">
                <span>Marij</span>
                <span>420</span>
                </div>
            </div>
            <div className='footer__copyright'>
                All rights reserved 2020
            </div>
        </footer>
    )
}
