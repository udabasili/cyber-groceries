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
                    <div className='close-button'  onClick={onClose}>
                        <FontAwesomeIcon icon={faTimes}  className='icon'/>
                    </div>
                }
                {children}
            </div>
        </div>
    )
}
