import React from 'react';
import { Link, Outlet } from 'react-router-dom';

function Layout() {
    return (
        <div className="flex flex-col min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow-md p-4">
                <div className="container mx-auto flex justify-between items-center">
                    <h1 className="text-2xl font-bold text-blue-600">DriveEase</h1>
                    <ul className="flex space-x-6">
                        <li>
                            <Link to="/" className="text-gray-700 hover:text-blue-600 transition">Home</Link>
                        </li>
                        <li>
                            <Link to="/about" className="text-gray-700 hover:text-blue-600 transition">About</Link>
                        </li>
                        <li>
                            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition">Contact</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Main Content */}
            <main className="flex-grow container mx-auto p-6">
                <Outlet />
            </main>

            {/* Footer */}
            <footer className="bg-gray-900 text-white text-center p-4 mt-6">
                <p>© {new Date().getFullYear()} DriveEase. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default Layout;
