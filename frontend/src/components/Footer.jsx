import Logo from './../assets/Image/logo1.png';
import Tiktok from './../assets/Image/tiktok.png';

function Footer() {
    return (
        <div>
            <hr className="mx-4 sm:mx-20" />
            <footer className="bg-white">
                <div className="mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between lg:gap-8">
                        <div className="text-gray-900 flex flex-col items-center">
                            <img
                                src={Logo}
                                alt="logo"
                                className="w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-full mt-4"
                            />
                        </div>

                        <div className="mt-8 lg:mt-0 lg:grid lg:grid-cols-2 lg:gap-8">
                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900">Info</p>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75">About us</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75">Term of use</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75">Privacy Policy</a>
                                    </li>
                                </ul>
                            </div>

                            <div className="col-span-2 sm:col-span-1">
                                <p className="font-medium text-gray-900">Get in touch</p>
                                <ul className="mt-4 space-y-4 text-sm">
                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75">Contact us</a>
                                    </li>
                                    <li>
                                        <a href="#" className="text-gray-700 transition hover:opacity-75">Request a topic for lesson</a>
                                    </li>
                                </ul>
                            </div>

                            <ul className="col-span-2 flex flex-wrap justify-center gap-6 lg:justify-end mt-6 lg:mt-0">
                                <li>
                                    <a
                                        href="https://www.facebook.com/nightowljapanese"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-700 transition hover:opacity-75"
                                    >
                                        <span className="sr-only">Facebook</span>
                                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path
                                                fillRule="evenodd"
                                                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </a>
                                </li>

                                <li>
                                    <a
                                        href="https://www.tiktok.com/@nightowl8181"
                                        rel="noreferrer"
                                        target="_blank"
                                        className="text-gray-700 transition hover:opacity-75"
                                    >
                                        <span className="sr-only">TikTok</span>
                                        <img
                                            src={Tiktok} // Update this path to where you placed the SVG
                                            alt="TikTok"
                                            className="w-6 h-6 rounded-full"
                                        />
                                    </a>
                                </li>


                            </ul>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default Footer;
