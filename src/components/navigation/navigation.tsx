import React, {ReactElement} from "react";
import {Link} from "react-router-dom";

import './navigation.scss';

const Navigation = (): ReactElement => {
    return (
        <div className="sidebar-nav-container">
            <nav className="main-nav">
                <ul className="site-nav">
                    <li className="site-nav-item">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="site-nav-item">
                        <Link to={"tasks/"}>Tasks</Link>
                    </li>
                </ul>
            </nav>


        </div>

    );
}

export default Navigation;