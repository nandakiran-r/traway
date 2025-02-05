import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Car, Home, ScrollText, AlertCircle, Users, Settings, LogOut, Menu, X, Bell, Search, FileText, BookUser, TriangleAlert, Toilet } from "lucide-react";
import { useUser } from '@/context/UserContext'
import SignIn from "@/pages/Auth/login";

function AppLayout() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("home");
    const [showPetitionForm, setShowPetitionForm] = useState(false);
    const [showAlertForm, setShowAlertForm] = useState(false);
    const [showTravelForm, setShowTravelForm] = useState(false);
    const navigate = useNavigate();
    const pathname = window.location.pathname;
    const { user, handleSignOut } = useUser();
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const handleOpenLogin = () => {
        setIsLoginOpen(true);
    };
    
    const handleCloseLogin = () => {
        setIsLoginOpen(false);
    };

    useEffect(() => {
        if (pathname.includes("petitions")) {
            setActiveTab("petitions");
        } else if (pathname.includes("incidents")) {
            setActiveTab("incidents");
        }
        else if (pathname.includes("travel")) {
            setActiveTab("travel");
        }
        else if (pathname.includes("report")) {
            setActiveTab("report");
        }
        else if (pathname.includes("restrooms")) {
            setActiveTab("restrooms");
        }
        else if (pathname.includes("settings")) {
            setActiveTab("settings");
        }
        else if (pathname.includes("awareness")) {
            setActiveTab("awareness");
        }
        else {
            setActiveTab("home");
        }
    }, [pathname]);


    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    const handleClick = (tab) => {
        setActiveTab(tab);
        navigate(tab);
    }
    return (
        <div className="min-h-screen flex bg-gradient-to-br from-blue-100 to-indigo-100">
            {/* Sidebar */}
            <aside
                className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-50 hidden sm:flex flex-col ${isSidebarOpen ? "w-64" : "w-20"
                    }`}
            >
                <div className="flex items-center justify-between p-4">
                    <div className="flex items-center space-x-3">
                        <Car className="h-8 w-8 text-blue-600" />
                        {isSidebarOpen && <span className="text-xl font-bold">Traway</span>}
                    </div>
                    <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
                        {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                    </button>
                </div>

                {/* Sidebar Navigation */}
                <nav className="mt-8 px-4 flex-grow">
                    {[
                        { name: "Home", icon: <Home />, tab: "home" },
                        { name: "Petition Hub", icon: <ScrollText />, tab: "petitions" },
                        { name: "Incident Reports", icon: <AlertCircle />, tab: "incidents" },
                        { name: "Restrooms", icon: <Toilet />, tab: "restrooms" },
                        { name: "Travel Together", icon: <Users />, tab: "travel" },
                        { name: "Breach Report", icon: <TriangleAlert />, tab: "report" },
                        { name: "Awareness", icon: <BookUser />, tab: "awareness" },
                        { name: "Settings", icon: <Settings />, tab: "settings" },
                    ].map(({ name, icon, tab }) => (
                        <button
                            key={tab}
                            className={`flex items-center space-x-3 my-1 px-4 py-3 rounded-lg w-full ${activeTab === tab ? "bg-blue-100 text-blue-700" : "text-gray-700 hover:bg-gray-100"
                                }`}
                            onClick={() => handleClick(tab)}
                        >
                            {icon}
                            {isSidebarOpen && <span>{name}</span>}
                        </button>
                    ))}
                </nav>

                {/* Log Out Button */}
                {user && (
                    < div className="mt-auto px-4 pb-4">
                        <button
                            className="flex items-center space-x-3 px-4 py-3 rounded-lg w-full text-gray-700 hover:bg-gray-100"
                            onClick={handleSignOut}
                        >
                            <LogOut />
                            {isSidebarOpen && <span>Log Out</span>}
                        </button>
                    </div>
                )
                }
            </aside >

            {/* Main Content */}
            < div className={`flex-1 transition-all duration-300 ${isSidebarOpen ? "sm:ml-64" : "sm:ml-20"}`}>
                {/* Top Navigation */}
                < nav className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg p-4 select-none" >
                    <div className="flex items-center justify-between max-w-7xl mx-auto">
                        <div />
                        <div className="relative border rounded-full border-gray-300 max-w-[400px] w-full">
                            <input
                                type="text"
                                placeholder="Search..."
                                className="w-full px-4 py-2 rounded-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full text-gray-600 hover:bg-white hover:bg-opacity-25 focus:outline-none">
                                <Bell className="h-6 w-6" />
                            </button>
                            {user && (
                                <div className="h-8 w-8 rounded-full bg-blue-500 px-2 text-white flex items-center justify-center">
                                    JD
                                </div>
                            )}
                            {!user && (
                                <button
                                    onClick={handleOpenLogin}
                                    className="flex items-center text-white space-x-3 px-4 py-1.5 rounded-lg w-full hover:text-gray-700 bg-blue-400 hover:bg-gray-200 cursor-pointer"
                                >
                                    <span>Login</span>
                                </button>
                            )
                            }
                        </div>
                    </div>
                </nav >

                {/* Main Dashboard Content */}
                < main className="p-8" >
                    <Outlet />
                </main >

                {/* Modals for Forms */}
                {/* {showPetitionForm && <PetitionForm onClose={() => setShowPetitionForm(false)} />} */}
                {/* {showAlertForm && <AlertForm onClose={() => setShowAlertForm(false)} />} */}
                {/* {showTravelForm && <TravelForm onClose={() => setShowTravelForm(false)} />} */}


                <SignIn open={isLoginOpen} onClose={handleCloseLogin} />
            </div >

        </div >
    );
}

export default AppLayout;
