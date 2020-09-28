import React from 'react'
import { NavLink } from 'react-router-dom';

function LeftNav(props) {
     return (
       <div className="left-nav">
         <nav className="left-nav__nav">
           <ul className="left-nav__list">
             <li className="left-nav__item">
               <NavLink
                 exact
                 to="/products"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 All
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/buds"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Buds
               </NavLink>
             </li>
             <li className="left-nav__item">

               <NavLink
                 to="/products/edibles"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Edibles
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/extracts"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Extracts
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/topicals"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Topicals
               </NavLink>
             </li>
             
             
           </ul>
         </nav>
       </div>
     );
}

LeftNav.propTypes = {

}

export default LeftNav

