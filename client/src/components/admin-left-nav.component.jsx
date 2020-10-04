import React from 'react'
import { NavLink } from 'react-router-dom'

/**
 *The left navigation for the admin page
 *
 * @export function LeftNav
 * @return {*} 
 */
export default function LeftNav() {
    return (
      <div className="left-nav">
        <nav className="left-nav__nav">
          <ul className="left-nav__list">
            <li className="left-nav__item">
              <NavLink
                exact
                to="/admin"
                className="left-nav__link"
                activeClassName="left-nav-active"
              >
                Dashboard
              </NavLink>
            </li>
            <li className="left-nav__item">
              <NavLink
                to="/admin/products"
                className="left-nav__link"
                activeClassName="left-nav-active"
              >
                Products
              </NavLink>
            </li>
            <li className="left-nav__item">
              <NavLink
                to="/admin/users"
                className="left-nav__link"
                activeClassName="left-nav-active"
              >
                Users
              </NavLink>
            </li>
            <li className="left-nav__item">
              <NavLink
                to="/admin/inventory"
                className="left-nav__link"
                activeClassName="left-nav-active"
              >
                Inventory
              </NavLink>
            </li>
            <li className="left-nav__item">
              <NavLink
                to="/admin/orders"
                className="left-nav__link"
                activeClassName="left-nav-active"
              >
                Orders
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    );
}
