import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'

/**
 *This handles the dropdown component showing the user data
 *
 * @export
 * @param {*} {onClick, currentUser}
 * @return {*} 
 */
export default function UserDropDown({onClick, currentUser}) {
    return (
        <div className='dropdown dropdown--1' >
            {currentUser &&
                <React.Fragment>
                    <FontAwesomeIcon className='close-button' icon={faTimesCircle} onClick={onClick}/>
                    <ul className="dropdown__list--1">
                        <h3 >{currentUser.name}</h3>
                        <li className="dropdown__item--1">
                            <span className="label">User ID: </span>
                            <span className="value">{currentUser.userId}</span>
                        </li>
                    </ul>
                </React.Fragment>
            }
            
        </div>
    )
}
