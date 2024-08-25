import React, { useState, useEffect } from 'react'
import { UserButton, useUser, SignInButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
function Header() {
    const {user,isSignedIn} = useUser();
    const location = useLocation();

    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
        if (window.scrollY > 50) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const headerClasses = isScrolled
    ? 'fixed top-0 left-0 w-full bg-white shadow-md z-50 transition-shadow duration-300'
    : 'fixed top-0 left-0 w-full z-50';

    const navItems = [
      { name: 'Home', path: '/' },
      { name: 'Free Lessons', paths: ['/freeLessons', '/freeLessons/Hiragana&Katakana'] },
      { name: 'Skills', path: '/skills' },
      { name: 'Test', path: '/test' },
      { name: 'Calendar', path: '/calendar', icon: <i className="fa-regular fa-calendar-days"></i> },
    ];

    const isActive = (item) => {
        if (item.paths) {
            return item.paths.includes(location.pathname);
        }
        return location.pathname === item.path;
    };

  return (
    <div className={headerClasses}>
         <div className="flex justify-between items-center shadow-sm p-5">
      <h1>Night Owl</h1>
      
      <ul className="hidden md:flex gap-5">
                    {navItems.map((item, index) => (
                        <li
                            key={index}
                            className={`font-medium hover:scale-105 transition-all cursor-pointer ${
                                isActive(item) ? 'text-primary' : 'hover:text-primary'
                            }`}
                        >
                            <Link to={item.path || item.paths[0]} className={isActive(item) ? 'text-blue-500' : ''}>
                                {item.icon ? item.icon : item.name}
                            </Link>
                        </li>
                    ))}
                </ul>

      {isSignedIn ? (
        <div className='flex justify-center items-center'>
            <UserButton />
        </div>
      ) : (
        <div>
            <Link to="/login">
              <Button>Sign in</Button>
            </Link>
          </div>
      )}    

    </div>
    </div>
  )
}

export default Header
