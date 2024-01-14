// components/Navbar.js

import Link from 'next/link';

const Nav = () => {
    return (
        <nav className="bg-white dark:bg-gray-800 shadow-md py-2 px-4 md:px-6">
            <div className="container mx-auto flex items-center justify-between">
                <Link className="text-2xl font-bold text-gray-900 dark:text-gray-100" href="/">
                    E-Cyber
                </Link>
                <div className="space-x-4">
                    <Link className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300" href="/services">
                        Services
                    </Link>
                    <Link className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300" href="/about">
                        About
                    </Link>
                    <Link className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-300" href="/contact">
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Nav;
