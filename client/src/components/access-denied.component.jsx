import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan } from '@fortawesome/free-solid-svg-icons'

/**
 *The component that shows when a non admin user tries to access an admin page
 *
 * @export function
 * @return {*} 
 */
export default function AccessDenied() {
     return (
       <div className="access-denied-page">
         <div className="access-denied">
           <FontAwesomeIcon
             icon={faBan}
             className="access-denied-icon"
             color="red"
           />
           <div className="access-denied-403">
                <h1 className="access-denied__main-header">
                    <span>4</span>
                    <span>0</span>
                    <span>3</span>
                </h1>
           </div>
           <h2 className="access-denied__secondary-header">
                You are forbidden from accessing this page
           </h2>
         </div>
       </div>
     );
}
