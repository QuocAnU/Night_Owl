import React, { useEffect } from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './../assets/Image/logo.jpg';

function LoginPage() {
  const { user } = useClerk();
  const location = useLocation();
  const navigate = useNavigate();
  
 useEffect(() => {
  console.log('useEffect triggered');
  if (user) {
    console.log('User:', user);
    console.log('Location State From:', location.state?.from);
    const redirectTo = location.state?.from === '/freeLessons/Hiragana&Katakana' ? '/freeTest' : '/';
    console.log('Redirecting to:', redirectTo);
    navigate(redirectTo);
  }
}, [user, location.state, navigate]);

  return (
    <div className="flex items-center justify-around h-screen p-24">
      <img src={Logo} alt='logo' className='w-2/5 h-4/5 rounded-3xl' />
      <div className="max-w-sm w-full">
        <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default LoginPage;
