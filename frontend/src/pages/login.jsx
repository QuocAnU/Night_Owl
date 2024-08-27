import React, { useEffect } from 'react';
import { SignIn, useClerk } from '@clerk/clerk-react';
import { useLocation, useNavigate } from 'react-router-dom';
import Logo from './../assets/Image/logo.jpg';

function LoginPage() {
  const location = useLocation();
  const redirectTo = location.state?.redirectTo || "/";

  return (
    <div className="flex flex-col md:flex-row items-center justify-center min-h-screen p-4 md:p-8 lg:p-12 bg-gray-100">
      <img src={Logo} alt='logo' className='w-3/4 md:w-1/2 lg:w-1/3 h-auto mb-8 md:mb-0 md:mr-8 rounded-3xl shadow-lg' />
      <div className="max-w-md w-full">
        <SignIn path="/login" routing="path" forceRedirectUrl={redirectTo} signUpUrl="/sign-up" />
      </div>
    </div>
  );
}

export default LoginPage;
