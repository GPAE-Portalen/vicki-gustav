import React from 'react';
import { NavLink } from 'react-router-dom';

export const Header = (): JSX.Element => {
    return (
        <header className="border-bottom">
            <nav className="navbar navbar-expand-md navbar-light bg-light">
                <div className="container">
                    <a className="navbar-brand" href="/">
                        <img src="/favicon-32x32.png" alt="Logo" className="d-inline-block align-text-top me-2" width="32" height="32" style={{ height: '32px', width: '32px' }} />
                        Vicki & Gustav
                    </a>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <NavLink to="/" className="nav-link" exact activeClassName='active'>
                                    Home
                                </NavLink>
                            </li>

                            <li className="nav-item">
                                <NavLink to="/recipes" className="nav-link" activeClassName='active'>
                                    Recipes
                                </NavLink>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
}