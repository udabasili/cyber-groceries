import React from 'react'
import logo from '../assets/images/HWY420.png'

export default function Footer() {
    return (
        <footer className='footer'>
            <div className="logo-box">
                <div className="logo"><img src={logo} alt='weblogo'/> </div>
                <div className="app-name">
                <span>HIGHway</span>
                <span>420</span>
                <span>Canna</span>
                </div>
            </div>
            <div className='footer__copyright'>
                All rights reserved 2020
            </div>
        </footer>
    )
}
