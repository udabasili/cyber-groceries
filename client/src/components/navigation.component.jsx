import React, { useState, useEffect, useRef } from 'react';
import {NavLink, useHistory} from 'react-router-dom';
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
	const [isMobile, setMobile] = useState(window.innerWidth <= 900);
	const history = useHistory()
	let listener = useRef(null)
	const setIsMobile = () => {
		let mobile = window.innerWidth <= 900
		setMobile(mobile)
		const nav = document.querySelector(".navigation__nav")
		if (!mobile) {
			nav.style.display = 'flex'
		} else {
			hideNavigationHandler()

		}

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
		if (listener.current) {
			listener.current()
		}
		if (isMobile) {
			listener.current = history.listen(() => {
				hideNavigationHandler()
			})
		}


		const nav = document.querySelector(".navigation__nav");
		const checkbox = document.querySelector(".navigation__checkbox");

		if (isMobile) {
			checkbox.addEventListener('change', function (e) {
				toggleCartDropDown(true)
				toggleUserDropdown(true)
				if (e.target.checked && isMobile) {
					nav.style.display = 'flex'
				} else {
					nav.style.display = 'none'

				}
			})
		}

		return () => {
			window.removeEventListener('resize', setIsMobile)

		}
	}, [isMobile])

	function hideNavigationHandler() {
		document.querySelector(".navigation__nav").style.display = 'none'
		document.querySelector(".navigation__checkbox").checked = false;
		toggleCartDropDown(true)
		toggleUserDropdown(true)

	}

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
				
			</div>
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

