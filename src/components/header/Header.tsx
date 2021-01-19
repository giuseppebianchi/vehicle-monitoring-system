import React from "react";
import classNames from "classnames";

import { Link } from "react-router-dom";
import {Navbar, MenuItems} from "../uikit/uikit";

import css from './Header.module.scss';
import logo from '../../assets/images/logo.svg'

interface HeaderProps {
    navbar: MenuItems[];
    action: (a: any) => void;
}

const Header: React.FC<HeaderProps> = ({navbar, action}) => {
    return (
        <header>
            <Navbar menu={navbar} classname="absolute bg-white w-screen" style={{zIndex: 1000}} logo={logo} onClickNavItem={action}/>
        </header>
    )
}

export default Header;
