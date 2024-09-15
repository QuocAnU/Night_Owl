import { useState, useEffect } from 'react'
import {  useUser, SignOutButton } from '@clerk/clerk-react';
import { Button } from './ui/button';
import { Link, useLocation } from 'react-router-dom';
import { Dropdown, Menu, Avatar } from 'antd';
import { useNavigate } from 'react-router-dom';



function Header() {
    const { user, isSignedIn } = useUser();
    const location = useLocation();
    const navigate = useNavigate();
    
    const UserMenu = (
        <Menu>
            <Menu.Item>
                <Link to="/profile">Profile</Link>
            </Menu.Item>
            <Menu.Item>
                <SignOutButton>Sign Out</SignOutButton>
            </Menu.Item>
        </Menu>
    )
    
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
        : 'fixed top-0 left-0 w-full z-50 bg-[#6BDCFFC2]';

    const navItems = [
        { name: 'Home', path: '/' },
        { name: 'Free Lessons', paths: ['/freeLessons', '/freeLessons/Hiragana&Katakana', '/freeTest'] },
        { name: 'Skills', 
            paths: ['/skills', '/skills/vocal', '/skills/vocal/:section', '/skills/vocal/:section/:sectionValue'
                ,'/skills/grammar', '/skills/grammar/:section', '/skills/grammar/:section/:sectionValue',
                '/skills/read', '/skills/read/:section',
                '/skills/listen', '/skills/listen/:section'
            ]},
        { name: 'Test', path: '/tests', paths: ['/tests', '/tests/vocal', 
            '/tests/vocal/:section',
            '/tests/grammar', '/tests/grammar/:section',
        ] },
        { name: 'Mark', path: '/mark', icon: <i className="fa-regular fa-calendar-days"></i> },
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

    const handleNavigation = (path) => {
        if (path === '/' || path === '/freeLessons') {
            navigate(path);
        } else if (!isSignedIn) {
            navigate('/login', { state: { redirectTo: path } });
        } else {
            navigate(path);
        }
    };


    return (
        <header className={headerClasses}>
            <div className="flex justify-between items-center p-5">
                <h1 onClick={() =>  navigate('/')} style={{ cursor: 'pointer' }} className="text-xl font-bold">Night Owl</h1>
                
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
                                <span 
                                    onClick={() => handleNavigation(item.path || item.paths[0])} 
                                    className={isActive(item) ? 'text-blue-500' : ''}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {item.icon ? item.icon : item.name}
                                </span>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Sign In or User Button */}
                <div className="flex items-center">
                    {isSignedIn ? (
                        <Dropdown overlay={UserMenu} trigger={['click']}>
                            <Avatar
                                src={user.imageUrl} // Clerk provides the user's profile image URL
                                size="large"
                                className="cursor-pointer"
                            />
                        </Dropdown>
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
