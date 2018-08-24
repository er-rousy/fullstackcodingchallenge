import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';


const MyFooter = ({ children }) => (
    <footer className="page-footer">
        <div className="footer-copyright">
            <div className="container">
                © 2018 Copyright Text
            <a className="grey-text text-lighten-4 right" href="#!">Fayssal errousy</a>
            </div>
        </div>
    </footer>
);



export default MyFooter;