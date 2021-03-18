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
                 to="/products/dairy"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Dairy
               </NavLink>
             </li>
              <li className="left-nav__item">
               <NavLink
                 to="/products/vegetable"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Vegetable
               </NavLink>
             </li>
             <li className="left-nav__item">

               <NavLink
                 to="/products/vegan"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Vegan
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/fruit"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Fruit
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/bakery"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Bakery
               </NavLink>
             </li>
             <li className="left-nav__item">
               <NavLink
                 to="/products/meat"
                 className="left-nav__link"
                 activeClassName="left-nav-active"
               >
                 Meat
               </NavLink>
             </li>             
           </ul>
         </nav>
       </div>
     );
}



export default LeftNav

