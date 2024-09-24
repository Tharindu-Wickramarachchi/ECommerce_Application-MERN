import React, { useState, useEffect } from 'react';
import { FaUser, FaShoppingCart, FaBars } from 'react-icons/fa';
import { FaCircleUser } from "react-icons/fa6";

const navLinks = [
    { title: 'Home', url: '/' },
    { title: 'About', url: '/about' },
    { title: 'Services', url: '/services' },
    { title: 'Contact', url: '/contact' }
];

const iconList = [
    { icon: <FaCircleUser /> },
    { icon: <FaShoppingCart /> },
];

const Navbar = () => {
    const [isMobile, setIsMobile] = useState(window.innerWidth < 600);
    const [showModal, setShowModal] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 600);
        };

        const handleScroll = () => {
            // Check if the page is scrolled
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleModal = () => {
        setShowModal(!showModal);
    };

    const handleBarsIconClick = () => {
        toggleModal();
    };

    return (
        <>
            {!isMobile ? (
                // Laptop Navbar
                <nav
                    className="sticky top-0 z-10 h-screen">
                    <div className={`flex items-center justify-between px-10 py-2 mx-auto ${isScrolled ? 'bg-sky-300/50' : 'bg-white'} transition-colors duration-300`}>

                        <div className="text-[35px] font-bold bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(45deg, #0040ff, #33d6ff)", 
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            S H O P
                        </div>
                        <ul className="flex text-black text-[22px] gap-10 items-center cursor-pointer">
                            {iconList.map((item, index) => (
                                <div key={index}>{item.icon}</div>
                            ))}
                        </ul>
                    </div>
                    <div className={`flex items-center justify-center mx-auto ${isScrolled ? 'bg-sky-300/50' : 'bg-white'} transition-colors duration-300`}>
                        <ul className="flex items-center justify-center text-center cursor-pointer md:gap-4 ">
                            {navLinks.map((link, index) => (
                                <li key={index} className="text-black font-bold py-2 w-[120px] text-center hover:bg-gradient-to-r hover:from-[#0066ff] hover:to-[#00FFFF] hover:text-white rounded">
                                    {link.title}
                                </li>
                            ))}
                        </ul>
                    </div>
                </nav>
            ) : (
                // Mobile Navbar
                <nav
                    className= "sticky top-0 z-10 h-screen transition-colors duration-300 ">
                    <div className={`flex items-center justify-between mx-auto ${isScrolled ? 'bg-sky-300/50' : 'bg-white'} transition-colors duration-300`} >
                        <div className="text-[35px] font-bold px-4 py-2 bg-clip-text text-transparent"
                            style={{ backgroundImage: "linear-gradient(45deg, #0011ff, #00FFFF)", 
                            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                            S H O P
                        </div>
                        <div className="flex justify-end items-center px-4 py-2 gap-6 text-black text-[22px] cursor-pointer ">
                            {iconList.map((item, index) => (
                                <div key={index} onClick={index === iconList.length - 1 ? handleBarsIconClick : null}>{item.icon}</div>
                            ))}
                            <FaBars onClick={handleBarsIconClick} className="text-black cursor-pointer" />
                        </div>
                    </div>
                    <div className="relative">
                        {/* Dropdown content */}
                        {showModal && (
                            <div className="absolute right-0 w-full max-w-xs mt-2 rounded-lg shadow-lg md:max-w-md bg-sky-200">
                                <div className="flex flex-col gap-4 px-2 py-2">
                                    {navLinks.map((link, index) => (
                                        <span key={index}
                                            className="text-black text-[20px] font-bold py-2 cursor-pointer text-center hover:bg-gradient-to-r hover:from-[#0066ff] hover:to-[#00FFFF] hover:text-white rounded"
                                            onClick={toggleModal}>
                                            {link.title}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </nav>
            )}
        </>
    );
}

export default Navbar;
