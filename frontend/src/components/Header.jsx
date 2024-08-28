import React, { useState, useEffect } from 'react'
import { UserButton, useUser } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';

function Header() {
    const { user, isSignedIn } = useUser();
    const location = useLocation();
    
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = isScrolled
        ? 'fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-shadow duration-300'
        : 'fixed top-0 left-0 w-full z-50';

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Free Lessons', paths: ['/freeLessons', '/freeLessons/Hiragana&Katakana', '/freeTest'] },
        { name: 'Skills', 
            paths: ['/skills', '/skills/vocal', '/skills/vocal/:section', '/skills/vocal/:section/:sectionValue'
                ,'/skills/grammar', '/skills/grammar/:section',
            ]},
        { name: 'Test', path: '/test' },
        { name: 'Calendar', path: '/calendar', icon: <i className="fa-regular fa-calendar-days"></i> },
    ];

    const isActive = (item) => {
        if (item.paths) {
            return item.paths.some(path => {
                const regex = new RegExp(`^${path.replace(/:\w+/g, '\\w+')}$`);
                return regex.test(location.pathname);
            });
        }
        return location.pathname === item.path;
    };


    return (
        <header className={headerClasses}>
            <div className="flex justify-between items-center p-5">
                <h1 className="text-xl font-bold">Night Owl</h1>
                
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex items-center p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    <i className="fa-solid fa-bars"></i>
                </button>

                {/* Navigation Links */}
                <nav className={`md:flex md:items-center md:gap-5 ${isMobileMenuOpen ? 'block' : 'hidden'} md:relative absolute left-0 w-full md:w-auto bg-white md:bg-transparent shadow-md md:shadow-none`}>
                    <ul className="flex flex-col md:flex-row md:gap-5 p-5 md:p-0">
                        {navItems.map((item, index) => (
                            <li
                                key={index}
                                className={`font-medium hover:scale-105 transition-all cursor-pointer ${isActive(item) ? 'text-primary' : 'hover:text-primary'}`}
                            >
                                <Link to={item.path || item.paths[0]} className={isActive(item) ? 'text-blue-500' : ''}>
                                    {item.icon ? item.icon : item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign In or User Button */}
                <div className="flex items-center">
                    {isSignedIn ? (
                        <UserButton />
                    ) : (
                         <Link to="/login" state={{ redirectTo: "/" }}>
                            <Button>Sign in</Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;
