import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCannabis, faGift, faDoorOpen, faHeartbeat } from '@fortawesome/free-solid-svg-icons';


export default function About() {
    return (
		<section className="section-about">
			<div className="u-center-text u-margin-bottom-big">
				<h2 className="heading-secondary">
						Why buy from us
				</h2>
				<div className="heading-secondary-underline">
					<FontAwesomeIcon icon={faCannabis} color='green' size='2x'/>
				</div>
			</div>
			<div className="row">
				<div className="about-box" >
					<div className='icon-box'>              
						<FontAwesomeIcon className="about-box__icon " icon={faHeartbeat} color='white'/>
					</div>
					<p className="about-box__text">Our product is made with love</p>
				</div>
				<div className="about-box" >
					<div className='icon-box'>              
						<FontAwesomeIcon className="about-box__icon " icon={faDoorOpen} color='white'/>
					</div>
					<p className="about-box__text">We are always available when you need us</p>
				</div>
				<div className="about-box" >
					<div className='icon-box'>              
						<FontAwesomeIcon className="about-box__icon " icon={faGift} color='white'/>
					</div>
					<p className="about-box__text">You get to buy holiday themed products when they come up</p>
				</div>
			</div>
		</section>
    );
}
