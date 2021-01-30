import React, {useState} from "react";
import {Link, NavLink} from "react-router-dom";
import classNames from "classnames";
import './tailwind.css';
import defaultImage from '../../assets/images/default.jpg'
import {LatLngTuple} from "leaflet";
import Moment from "react-moment";
import {FaCross, FaTimes} from "react-icons/all";

const getStyledIcon = (icon: JSX.Element, classname: string) => {
    return (
        <span className={classname}>
            {icon}
        </span>
    )
}


export interface MenuItems {
    icon?: JSX.Element;
    name: string;
    link: string;
    dropdown?: {
        name: string;
        link: string;
    }[];
    action?: (a: any) => void;
}

interface NavbarButton {
    name: string;
    action?: string;
    class?: string;
}

interface NavbarProps {
    menu?: MenuItems[];
    logo?: any;
    classname?: string;
    style?: {
        [key: string]: string | number;
    }
    buttons?: NavbarButton[];
    onClickNavItem?: (a: any) => void;
}
const NavItem: React.FC<MenuItems> = ({name, link, dropdown, action}) => {
    const [active, setActive] = useState(false)
    const checkActive = (match?: any, location?: any) => {
        if (!match) {
            setActive(false)
            return false;
        }else {
            setActive(true)
            action && action(name)
            return true
        }
    }
    return (
        <>
            {dropdown
                ? <div className="relative">
                    <button type="button"
                            className="group bg-white rounded-md text-gray-500 inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        <span>Solutions</span>
                        <svg className="ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                             xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             aria-hidden="true">
                            <path fillRule="evenodd"
                                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <div className="hidden absolute z-10 -ml-4 mt-3 transform px-2 w-screen max-w-md sm:px-0 lg:ml-0 lg:left-1/2 lg:-translate-x-1/2">
                        <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div className="relative grid gap-6 bg-white px-5 py-6 sm:gap-8 sm:p-8">
                                <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <svg className="flex-shrink-0 h-6 w-6 text-blue-600"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                            Analytics
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Get a better understanding of where your traffic is coming from.
                                        </p>
                                    </div>
                                </a>

                                <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <svg className="flex-shrink-0 h-6 w-6 text-blue-600"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"/>
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                            Engagement
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Speak directly to your customers in a more meaningful way.
                                        </p>
                                    </div>
                                </a>

                                <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <svg className="flex-shrink-0 h-6 w-6 text-blue-600"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                            Security
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Your customers&#039; data will be safe and secure.
                                        </p>
                                    </div>
                                </a>

                                <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <svg className="flex-shrink-0 h-6 w-6 text-blue-600"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"/>
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                            Integrations
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Connect with third-party tools that you&#039;re already using.
                                        </p>
                                    </div>
                                </a>

                                <a href="#" className="-m-3 p-3 flex items-start rounded-lg hover:bg-gray-50">
                                    <svg className="flex-shrink-0 h-6 w-6 text-blue-600"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                                    </svg>
                                    <div className="ml-4">
                                        <p className="text-base font-medium text-gray-900">
                                            Automations
                                        </p>
                                        <p className="mt-1 text-sm text-gray-500">
                                            Build strategic funnels that will drive your customers to convert
                                        </p>
                                    </div>
                                </a>
                            </div>
                            <div className="px-5 py-5 bg-gray-50 space-y-6 sm:flex sm:space-y-0 sm:space-x-10 sm:px-8">
                                <div className="flow-root">
                                    <a href="#"
                                       className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                        <svg className="flex-shrink-0 h-6 w-6 text-gray-400"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                        </svg>
                                        <span className="ml-3">Watch Demo</span>
                                    </a>
                                </div>
                                <div className="flow-root">
                                    <a href="#"
                                       className="-m-3 p-3 flex items-center rounded-md text-base font-medium text-gray-900 hover:bg-gray-100">
                                        <svg className="flex-shrink-0 h-6 w-6 text-gray-400"
                                             xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                                        </svg>
                                        <span className="ml-3">Contact Sales</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <NavLink to={link}
                           className={classNames("font-medium cursor-pointer px-3 py-2 dark:text-white rounded-md transition-all duration-150",
                               {"active bg-blue-100 text-blue-500": active}, {"text-gray-500 hover:bg-gray-100": !active})}
                           isActive={checkActive}>
                    {name}
                </NavLink>}
        </>
    )

}

const NavbarMobile: React.FC<NavbarProps> = ({menu, style}) => {
    return (
        <div id="menu-mobile" className="hidden absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden" style={style}>
            <div
                className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 bg-white divide-y-2 divide-gray-50">
                <div className="pt-5 pb-6 px-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <img className="h-8 w-auto"
                                 src="https://tailwindui.com/img/logos/workflow-mark-blue-600.svg" alt="Workflow" />
                        </div>
                        <div className="-mr-2">
                            <button type="button"
                                    className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                                <span className="sr-only">Close menu</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                     viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div className="mt-6">
                        <nav className="grid gap-y-8">
                            {menu && menu.map(({name, link, icon}) => {
                                return (
                                    <Link key={name} to={link} className="-m-3 p-3 flex items-center rounded-md hover:bg-gray-50">
                                        {icon && getStyledIcon(icon, "flex-shrink-0 h-6 w-6 text-blue-600")}
                                        <span className="ml-3 text-base font-medium text-gray-900">{name}</span>
                                    </Link>
                                )
                            })}

                        </nav>
                    </div>
                </div>
                <div className="py-6 px-5 space-y-6">
                    <div>
                        <a href="#" className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Sign up
                        </a>
                        <p className="mt-6 text-center text-base font-medium text-gray-500">
                            Existing customer?
                            <a href="#" className="text-blue-600 hover:text-blue-500">
                                Sign in
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const Navbar: React.FC<NavbarProps> = ({menu, logo, style, classname, onClickNavItem}) => {
    return (
        <div className={classname ? classname : "relative bg-white"} style={style}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center border-b-2 border-gray-100 py-6 md:justify-start md:space-x-10">
                    <div className="flex justify-start lg:w-0 lg:flex-1">
                        <a href="#">
                            <span className="sr-only">Workflow</span>
                            <img className="h-8 w-auto sm:h-10"
                                 src={logo ? logo : "https://tailwindui.com/img/logos/workflow-mark-blue-600.svg"} alt="" />
                        </a>
                    </div>
                    <div className="-mr-2 -my-2 md:hidden">
                        <button type="button"
                                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500">
                            <span className="sr-only">Open menu</span>
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                 stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                    <nav className="hidden md:flex space-x-10">
                        {menu && menu.map(({name, link, dropdown}) => {
                            return (
                                <NavItem name={name} link={link} key={name} dropdown={dropdown} action={onClickNavItem}/>
                            )
                        })}
                    </nav>
                    <div className="hidden md:flex items-center justify-end md:flex-1 lg:w-0">
                        <a href="#"
                           className="whitespace-nowrap text-base font-medium text-gray-500 p-2 px-4 rounded-md hover:text-gray-900 hover:bg-gray-100 transition-all duration-150">
                            Reconnect
                        </a>
                        <a href="#"
                           className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-600 hover:bg-blue-700">
                            Settings
                        </a>
                    </div>
                </div>
            </div>
            <NavbarMobile menu={menu}/>
        </div>
    )
}

interface SidebarProps {
    info?: {
        top: string;
        bottom: string;
        img: string;
    }[];
    items?: {
        name: string;
        link: string;
        data_url: string;
        icon?: JSX.Element;
    }[];
    style?: {
        [key: string]: string | number;
    };
    classname?: string;
    collapsible?: boolean;
    active: string;
    onClickItem: (v: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({items, style, classname, info, collapsible, active, onClickItem, children}) => {
    const [collapsed, setCollapsed] = useState(false)
    const default_classname =  "relative h-screen inline-flex flex-col justify-between items-center bg-white shadow p-6"
    const item_classname = "hover:bg-gray-100";
    const item_classname_active = "bg-blue-100 text-blue-500"
    const collapsedSidebarHandler = () => {
        setCollapsed(!collapsed)
    }
    return (
        <aside className={`${classname ? classname : default_classname} ${collapsed ? "collapsed-sidebar" : ""}`} style={style}>
            <nav className=" inline-flex flex-col space-y-2 w-full xl:text-xl">
                {items ? items.map(({name, icon}) => {
                    return (
                        <span  key={name} className={classNames(
                            "b-list-item flex items-center text-gray-500 py-2 cursor-pointer dark:text-white pl-2 pr-6 rounded-lg transition-all duration-150",
                                    { [item_classname_active]: active === name },
                                    { [item_classname]: active !== name },
                            )} onClick={() => onClickItem(name)}>
                            <span className="w-8 p-1 mr-4 text-blue-500 text-xl">
                                {icon}
                            </span>
                            <span className="sidebar-label font-medium select-none">{name}</span>
                        </span>
                    )
                }) : children}
            </nav>
            <div className="sidebar-infobox w-full bg-gray-100 bottom-2 rounded-lg transition-all duration-150  p-4">
            {info && info.map((item: any) => (
                <div className="b-list-item flex items-center w-full bg-gray-100 bottom-2 rounded-lg transition-all duration-150 transform hover:scale-110 p-4 my-3">
                    <img
                    src={item.img ? item.img : defaultImage}
                    alt={item.top} className="w-10 h-10 object-cover rounded-full mr-4 border border-solid border-white" />
                    <div className="sidebar-label">
                        <h3 className="text-gray-900 font-semibold">{item.top}</h3>
                        <h4 className="text-sm text-gray-700 mt-1">{item.bottom}</h4>
                    </div>
                </div>
            ))}
            </div>
            {collapsible && <span id="close-sidebar" onClick={collapsedSidebarHandler} /> }
        </aside>
    )
}

interface BannerProps {
    classname?: string;
    style?: {
        [key: string]: string | number;
    };
    onClickClose?: () => void;
}

export const Banner: React.FC<BannerProps> = ({classname, style, children, onClickClose}) => {
    return (
        <div className={classname ? classname : "bg-blue-600 rounded-md"} style={style}>
            <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between">
                    {children}
                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                        <button type="button" onClick={onClickClose}
                                className="-mr-1 flex p-2 rounded-md hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2 transition-all duration-150">
                            <span className="sr-only">Dismiss</span>
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

interface DetailCardProps {
    title: string;
    subtitle: string;
    img?: any;
    classname?: string;
    style?: React.CSSProperties;
    selected?: boolean;
    thumbnail?: string;
    content?: any;
    actions?: any;
}

export const DetailCard: React.FC<DetailCardProps> = ({title, subtitle, img, selected, classname, style, children, thumbnail, content, actions}) => {
    return (
        <article className={classname ? classname : "detail-card flex flex-col text-gray w-full h-auto mb-5 relative"} style={style}>
            <header className="header flex items-center mt-4 order-3">
                <a href="#" className="mr-3">
                    {img ? img : <img src={defaultImage} className="authorAvatar w-14 h-auto bg-black overflow-hidden rounded-lg" />}
                </a>
                <div className="titleAndAuthor w-11/12 truncate">
                    <h3 className="font-medium text-gray-100">UnitSN: <span className="font-bold text-white text-xl">{title}</span></h3>
                    <h3 className="font-medium text-gray-100">UnitID: <span className="font-bold text-gray-100">{subtitle}</span></h3>
                </div>
            </header>
            <div className="thumbnail-wrap relative p-4 rounded-md bg-white bg-opacity-90">
                {thumbnail && <><img className="grid-preview-image absolute object-cover w-full h-full top-0 left-0" loading="lazy"
                                     alt=""
                                     src="https://lh3.googleusercontent.com/proxy/JZ5LHdRREts9BwrZTPbzQk1b9pM1PhRWUS7TaMhU--w9q8FyQwzF08EFpUrRlAUBoojqs77SoyJS_qEOJAwzGkr8C5eigo5LMGBc8IbKpqesIsUUVvp_dNIwGkojXGZf1vPu_19Zw-lRZ2eEWc9gkdc" />
                   </>}
                {content.jsx}
                <span className="cover-link absolute inset-0 border-0 hidden"></span>
                <span className="absolute top-0 bottom-0 right-0 p-4 pl-10 z-10 opacity-0 hover:opacity-100 transition-all duration-500">
                    <button
                        onClick={actions?.onClose}
                        className="text-lg p-1 bg-white rounded-md shadow-md transform hover:scale-110 transition-transform duration-250" title="Close">
                        <FaTimes />
                    </button>
                </span>
            </div>
            <footer className="stats absolute -bottom-12 h-10 flex items-center space-x-4 text-md font-medium overflow-hidden">
                <span className={classNames("single-stat sm:w-auto leading-none text-white rounded-md bg-white transform transition-all duration-150  relative opacity-0 relative py-2 px-4 border-0 delay-100 hover:-translate-y-1 ", {"bg-realtime": content.options.isRealtime}, {"bg-offline": !content.options.isRealtime})} >{content.options.isRealtime ? "Online" : "Offline"}</span>
                <span onClick={actions?.button1}
                      className="single-stat sm:w-auto leading-none text-gray-400 rounded-md bg-white cursor-pointer transform transition-all duration-150  relative opacity-0 relative py-2 px-4 border-0 delay-100 hover:-translate-y-1 ">Locate</span>
                <span className="single-stat sm:w-auto leading-none text-gray-400 rounded-md bg-white cursor-pointer transform transition-all duration-150  relative opacity-0 relative py-2 px-4 border-0 delay-100 hover:-translate-y-1 ">Copy Coords</span>
            </footer>
        </article>
    )
}
interface CardProps {
    title: string;
    subtitle: string;
    img?: string;
    classname?: string;
    style?: React.StyleHTMLAttributes<any>;
    selected?: boolean;
    thumbnail?: string;
    content?: any;
    action: any
}
//height is valiable and can contain a header, footer and body
export const ContentCard: React.FC<CardProps> = ({title, subtitle, img, content, selected, action, classname, style, children, thumbnail}) => {
    const isRealtime = content.options.isRealtime || false;
    return (
        <article className={classNames("b-card relative text-gray w-full h-auto mb-6 font-medium", {"highlighted-card": selected})}>
            <div className="thumbnail-wrap absolute inset-0 rounded-lg overflow-hidden shadow-lg bg-opacity-80 bg-cover bg-blurred bg-white">
                {thumbnail && <><img className="grid-preview-image absolute object-cover w-full h-full top-0 left-0" loading="lazy"
                     alt=""
                     src="https://lh3.googleusercontent.com/proxy/JZ5LHdRREts9BwrZTPbzQk1b9pM1PhRWUS7TaMhU--w9q8FyQwzF08EFpUrRlAUBoojqs77SoyJS_qEOJAwzGkr8C5eigo5LMGBc8IbKpqesIsUUVvp_dNIwGkojXGZf1vPu_19Zw-lRZ2eEWc9gkdc" />
                    <a className="cover-link absolute inset-0 border-0"
                       href="#"></a></>}
            </div>
            <div className="b-card-content relative">
                <header className="header top-0 flex items-center p-4">
                    <a href="/giuseppebianchi" className="mr-3">
                        <img
                            src={img ? img : defaultImage}
                            alt="Profile image for" className="authorAvatar w-14 h-auto bg-black overflow-hidden rounded-md"
                        />
                    </a>
                    <div className="titleAndAuthor w-11/12 truncate">
                        <h3 className="font-medium text-blue-300 text-sm">UnitSN: <span className="font-extrabold text-gray-600 text-lg">{title}</span></h3>
                        <h3 className="font-medium text-blue-300 text-sm">UnitID: <span className="font-bold text-gray-400">{subtitle}</span></h3>
                    </div>
                    <div className="action-menu mr-1 flex relative rounded-md w-fit">
                        <button className="button MenuAction_button-1K2jT invisible-button ItemActions_button-1IG6J"
                                title="Actions" data-test-id="action-menu" aria-haspopup="true" aria-expanded="false">
                            <svg width="20" height="20" className="icon icon-ellipse" fill="#747A95">
                                <use xlinkHref="/svgs/compiled/svgs.40016ff2.svg#ellipse"></use>
                            </svg>
                        </button>
                    </div>
                </header>
                {content.jsx}
                <footer className="footer absolute flex items-center px-4 -bottom-3" /* bottom-0 p-6 */>
                    <div className="list-buttons flex items-center flex-row space-x-4">
                        <span className={classNames("rounded-md text-white items-center justify-center px-4 py-1 text-sm transition-all duration-500", {"bg-realtime": isRealtime}, {"bg-offline": !isRealtime})} >{isRealtime ? "Online" : "Offline"}</span>
                        <span onClick={action}
                            className="sm:w-auto leading-none text-gray-400 rounded-md bg-white cursor-pointer shadow-sm py-1 px-4 border border-transparent transform transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5  hover:text-blue-300">Locate</span>
                    </div>
                </footer>
            </div>
        </article>
    )
}
//height is fixed, based on thumbnail, and can contain a bannar on top or bottom
export const Card: React.FC<CardProps> = ({title, subtitle, img, selected, classname, style, children, thumbnail}) => {
    return (
        <article className="b-card relative flex flex-col text-gray w-full h-auto mb-5 shadow-lg font-medium">
            <div className="thumbnail-wrap relative h-0 rounded-lg pt-40 overflow-hidden bg-white bg-opacity-80 bg-cover bg-blurred">
                {thumbnail && <><img className="grid-preview-image absolute object-cover w-full h-full top-0 left-0" loading="lazy"
                                     alt=""
                                     src="https://lh3.googleusercontent.com/proxy/JZ5LHdRREts9BwrZTPbzQk1b9pM1PhRWUS7TaMhU--w9q8FyQwzF08EFpUrRlAUBoojqs77SoyJS_qEOJAwzGkr8C5eigo5LMGBc8IbKpqesIsUUVvp_dNIwGkojXGZf1vPu_19Zw-lRZ2eEWc9gkdc" />
                    <a className="cover-link absolute inset-0 border-0"
                       href="#"></a></>}
            </div>
            <header className="header absolute top-0 flex items-center p-4 pb-6">
                <a href="/giuseppebianchi" className="mr-3">
                    <img
                        src={img ? img : defaultImage}
                        alt="Profile image for" className="authorAvatar w-14 h-auto bg-black overflow-hidden rounded-md"
                    />
                </a>
                <div className="titleAndAuthor w-11/12 truncate">
                    <h3 className="font-medium text-blue-300 text-sm">UnitSN: <span className="font-bold text-gray-500">{title}</span></h3>
                    <h3 className="font-medium text-blue-300 text-sm">UnitID: <span className="font-bold text-gray-500">{subtitle}</span></h3>
                </div>
                <div className="action-menu mr-1 flex relative rounded-md w-fit">
                    <button className="button MenuAction_button-1K2jT invisible-button ItemActions_button-1IG6J"
                            title="Actions" data-test-id="action-menu" aria-haspopup="true" aria-expanded="false">
                        <svg width="20" height="20" className="icon icon-ellipse" fill="#747A95">
                            <use xlinkHref="/svgs/compiled/svgs.40016ff2.svg#ellipse"></use>
                        </svg>
                    </button>
                </div>
            </header>
            <footer className="header absolute flex items-center px-4 -bottom-3" /* bottom-0 p-6 */>
                <div className="list-buttons flex items-center flex-row space-x-4">
                    <span className="rounded-md bg-blue-500 text-white items-center justify-center px-4 py-1 text-sm">Title</span>
                    <span className="sm:w-auto leading-none text-gray-300 rounded-md bg-white cursor-pointer shadow-sm py-1 px-4 border border-transparent transform transition-all duration-150 hover:shadow-lg hover:-translate-y-0.5  hover:text-blue-300">Title</span>
                </div>
            </footer>
        </article>
    )
}
export const EmptyCard: React.FC = ({children}) => {
    return (
        <article className="b-card relative flex flex-col text-gray w-full h-auto mb-5 shadow-lg font-medium">
            <div
                className="thumbnail-wrap relative h-0 rounded-lg pt-40 overflow-hidden bg-white bg-opacity-80 bg-cover bg-blurred"></div>
            <header className="animate-pulse header w-full absolute top-0 flex items-center p-4 pb-6">
                <div className="rounded-full w-10 h-8 bg-gray-300"></div>
                <div className="titleAndAuthor w-full p-3 truncate">
                    <div className="h-3 w-full bg-gray-200 rounded-full my-3"></div>
                    <div className="h-3 w-full bg-gray-200 rounded-full  my-3"></div>
                </div>
            </header>
        </article>
    )
}
