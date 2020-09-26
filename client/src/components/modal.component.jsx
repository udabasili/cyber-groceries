import React from 'react'
import {
    FontAwesomeIcon
} from '@fortawesome/react-fontawesome';
import {
    faTimes
} from '@fortawesome/free-solid-svg-icons';
export default function Modal({children, onClose}) {
    return (
        <div className="modal">
            <div className='modal__content'>
                {onClose && 
                    <FontAwesomeIcon icon={faTimes} color='red' size='3x' onClick={onClose} className='close-button'/>
                }
                {children}
            </div>
        </div>
    )
}
