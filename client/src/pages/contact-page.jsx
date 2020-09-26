import React, { Component } from 'react'
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faPhone } from '@fortawesome/free-solid-svg-icons';

console.log(process.env.REACT_APP_GOOGLE_MAP_API);
export default class ContactPage extends Component {
    render() {
        return (
          <div className="contact-page">
            <header className="header">
              <h1 class="heading-primary">
                <span class="heading-primary__main">Contact</span>
              </h1>
            </header>
            <div className="contact">
                <div className="communication">
                    <h3 className="contact__header">Communication</h3>
                    <span className="email">
							<FontAwesomeIcon icon={faEnvelopeOpen} color='black' className='communication__icon' size='1x'/>
                            juliannapeterpaul@highway420canna.ca
                        </span>
                     <div>
                        <span className="phone">
                            <FontAwesomeIcon icon={faPhone} color='black' className='communication__icon' size='1x'/>
                            5066252894
                        </span>
                        
                  </div>
              </div>
              <div className="hours">
                    <h3 className="contact__header">Hours</h3>
					<span>Sunday: 11am -10pm</span>
					<span>Monday: 11am -10pm</span>
					<span>Tuesday: 11am -10pm</span>
					<span>Wednesday: 11am -10pm</span>
					<span>Thursday: 11am -10pm</span>
					<span>Friday -Saturday: 11am -11pm</span>

              </div>
              <div className="location">
                <h3 className="contact__header">Location</h3>
                < p className = 'address' > 212 Indian garden road Red bank New Brunswick</p>
              </div>
              <div className="social-media">
                <h3 className="contact__header">Social Media</h3>
                <div>
                    <a href='https://www.facebook.com/Highway-420-Canna-104529511359416' target='face' className='media-link'>
                        <FontAwesomeIcon icon={faFacebookSquare} size="3x" color='green' />
                    </a>
                    <a href='https://www.instagram.com/highway420.canna/' target='instagram'  className='media-link'>
                        <FontAwesomeIcon icon={faInstagramSquare} size="3x"  color='green'/>
                    </a>
                </div>
                
              </div>
            </div>
          </div>
        );
    }
}
