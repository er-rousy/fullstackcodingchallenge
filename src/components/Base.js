import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from './../modules/Auth';
import MyFooter from './footer.js';
import DialogUpdateFirebase from './DialogUpdateFirebase';
const Base = ({ children }) => (
  <div>
    <nav>
      <div className="nav-wrapper">
        <div className="brand-logo">
          <IndexLink to="/"> React App </IndexLink>
        </div>

        {Auth.isUserAuthenticated() ? (
          <ul className="right hide-on-med-and-down">
            <li className="top-bar-right">
              <Link to="/logout">
                <i className="fas fa-sign-out-alt"></i>
                <span className="ml3"> Log out  </span>
              </Link>
            </li>
            <li>
              <DialogUpdateFirebase />
            </li>
          </ul>) : (
            <ul className="right hide-on-med-and-down">
              <li className="top-bar-right">
                <Link to="/login">
                  <i className="fas fa-sign-in-alt"></i>
                  <span className="ml3"> Log in </span>
                </Link>
              </li>
              <li className="top-bar-right">
                <Link to="/signup">
                  <i className="fas fa-user-plus"></i>
                  <span className="ml3"> Sign up</span>
                </Link>
              </li>
            </ul>
          )}

      </div>
    </nav>

    <main>
      { /* child component will be rendered here */}
      {children}
    </main>
    <MyFooter />
  </div>
);

Base.propTypes = {
  children: PropTypes.object.isRequired
};

export default Base;