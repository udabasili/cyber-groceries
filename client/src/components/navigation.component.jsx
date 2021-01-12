import React, { useState, useEffect } from 'react';
import {NavLink} from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {  faCannabis,  faAngleDown, faUser } from '@fortawesome/free-solid-svg-icons'
import CartIcon from './cart-icon.component';
import CartDropDown from './cart-dropdown.component';
import UserDropDown from './user-dropdown.component';
import { connect } from 'react-redux'
import { toggleCartDropDown } from '../redux/actions/cart.action';
import { toggleUserDropdown, logOut } from '../redux/actions/user.action';
import logo from '../assets/logo/app-icon.png'
import { toast } from 'react-toastify';

function Navigation({
		isAdmin, 
		logOut,
		isAuthenticated, 
		toggleCartDropDown, 
		toggleUserDropdown, 
		currentUser,
		hideUserCart, 
		hideCartDropDown
	}) {
	const [isMobile, setMobile] = useState(window.innerWidth <= 600);

	const setIsMobile = () => {
		setMobile(window.innerWidth <= 600)

	}

	const logoutHandler = () =>{
		logOut()
			.then((result) => {
				toast.success(result)

			}).catch((err) => {
				toast.error(err)
			});
	}

	useEffect(() => {
		window.addEventListener('resize', setIsMobile)
		const navLinks = document.querySelectorAll(".navigation__link");
		const checkbox = document.querySelector(".navigation__checkbox");
		navLinks.forEach((navLink) => (
			navLink.addEventListener('click', function(){
				checkbox.checked = false
			})
		))
		return () => {
			window.removeEventListener('resize', setIsMobile)
		}
	}, [])

	return (
		<div className="navigation">
			<div className='navigation__header'>
				<div className="logo-box">
					<div className="logo"><img src={logo} alt='weblogo'/> </div>
						<NavLink to='/' className="app-name">
							<span>Cyber</span>
							<span>Groceries</span>
						</NavLink>
					
				</div>
				<input type="checkbox" className="navigation__checkbox" id="toggle" />

				<label htmlFor="toggle" className="navigation__button">
					<span className="navigation__icon">&nbsp;</span>
				</label>
				{isAuthenticated && 
					<div className=" current-user">
						{!isMobile ?
							<React.Fragment>
								{`${currentUser.username}`}
								<FontAwesomeIcon 
									icon={faAngleDown} 
									color='black' 
									size='1x' 
									onClick={() => toggleUserDropdown(false)} />
							</React.Fragment> :
							<FontAwesomeIcon 
								icon={faUser} 
								className='user-icon' 
								color='black' 
								size='1x' onClick={() => toggleUserDropdown()} />
						}
							{!hideUserCart && <UserDropDown currentUser={currentUser} onClick={() => toggleUserDropdown(true)} />}
					</div>
				}
				<CartIcon onClick={() => toggleCartDropDown()}/>
				{!hideCartDropDown &&
					<CartDropDown />
				}
				<nav className="navigation__nav">

					<ul className="navigation__list">
						<li className="navigation__item">
							<NavLink
								exact
								to="/"
								className="navigation__link"
								activeClassName="navigation__active"
							>
								<FontAwesomeIcon
									icon={faCannabis}
									size="1x"
									className="navigation__i"
								/>
						home
						</NavLink>
						</li>
						{isAdmin && <li className="navigation__item">
							<NavLink
								to="/admin"
								className="navigation__link"
								activeClassName="navigation__active">
								<FontAwesomeIcon
									icon={faCannabis}
									size="1x"
									className="navigation__i"
								/>
							admin
						</NavLink>
						</li>
						}
						<li className="navigation__item">
							<NavLink
								to="/products"
								className="navigation__link"
								activeClassName="navigation__active"
							>
								<FontAwesomeIcon
									icon={faCannabis}
									size="1x"
									className="navigation__i"
								/>
						products
						</NavLink>
						</li>
						<li className="navigation__item">
							<NavLink
								to="/contact"
								className="navigation__link"
								activeClassName="navigation__active"
							>
								<FontAwesomeIcon
									icon={faCannabis}
									size="1x"
									className="navigation__i"
								/>
						contact
						</NavLink>
						</li>
						{isAuthenticated ?
							<li className="navigation__item">
								<NavLink
									to="/"
									className="navigation__link"
									onClick={logoutHandler}
								>
									<FontAwesomeIcon
										icon={faCannabis}
										size="1x"
										className="navigation__i" />
								signout
							</NavLink>
							</li> :
							<li className="navigation__item">
								<NavLink
									to="/auth/register"
									className="navigation__link"
									activeClassName="navigation__active">
									<FontAwesomeIcon
										icon={faCannabis}
										size="1x"
										className="navigation__i" />
								signin
							</NavLink>
							</li>
						}
					</ul>
				</nav>
			</div>
			
		</div>
	);
}



const mapStateToProps = (state) => ({
	hideCartDropDown: state.user.hideCartDropDown,
	hideUserCart: state.user.hideUserCart,
})

const mapDispatchToProps = (dispatch) => ({
	toggleUserDropdown: (hideCart) => dispatch(toggleUserDropdown(hideCart)),
	toggleCartDropDown: () => dispatch(toggleCartDropDown()),
	logOut: () => dispatch(logOut())
})

export default connect(mapStateToProps, mapDispatchToProps)(Navigation)

