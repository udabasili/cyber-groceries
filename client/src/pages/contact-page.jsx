import React, { Component } from 'react'
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {faFacebookSquare, faInstagramSquare } from '@fortawesome/free-brands-svg-icons';
import { faEnvelopeOpen, faPhone } from '@fortawesome/free-solid-svg-icons';

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
                            xxxxxxxx
                        </span>
                     <div>
                        <span className="phone">
                            <FontAwesomeIcon icon={faPhone} color='black' className='communication__icon' size='1x'/>
                            xxxxxxxxxx
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
                < p className = 'address' > xxxxxxxxxxxx</p>
              </div>
              <div className="social-media">
                <h3 className="contact__header">Social Media</h3>
              </div>
            </div>
          </div>
        );
    }
}
