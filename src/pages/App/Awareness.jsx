import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { useUser } from '@/context/UserContext';
import SignIn from "@/pages/Auth/login";

// Modern Card Component
function TrafficAwarenessCard({ title, description, points }) {
    return (
        <div className="p-6 bg-white rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
            <p className="text-sm text-gray-600 mb-4">{description}</p>
            <ul className="space-y-2">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm text-gray-700">
                        <span className="text-green-500">✓</span>
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

// FAQ Component
function TrafficFAQ({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border-b border-gray-200 py-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex justify-between w-full text-left"
            >
                <h4 className="text-base font-medium text-gray-800">{question}</h4>
                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
            </button>
            {isOpen && <p className="mt-2 text-sm text-gray-600">{answer}</p>}
        </div>
    );
}

// Emergency Contacts Section
function EmergencyContacts() {
    const contacts = [
        { name: "Kerala Police", number: "100" },
        { name: "Ambulance Services", number: "102" },
        { name: "Fire Brigade", number: "101" },
        { name: "Roadside Assistance (Toll-Free)", number: "1800-425-0333" },
        { name: "Motor Vehicles Department Helpline", number: "1800-425-0222" }
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
            <ul className="space-y-2">
                {contacts.map((contact, index) => (
                    <li key={index} className="flex justify-between text-sm text-gray-700">
                        <span>{contact.name}</span>
                        <span className="font-medium text-blue-600">{contact.number}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

function Awareness() {
    const { user } = useUser();
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading for awareness data
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }, []);

    const handleShowForm = (show) => {
        if (user) {
            setShowForm(show);
        } else {
            setShowLoginModal(true);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Traffic Awareness - Kerala Highways</h1>
                {showLoginModal && <SignIn onClose={() => setShowLoginModal(false)} />}
            </div>

            {/* Awareness Sections */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Awareness Information */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Traffic Rules & Regulations</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <TrafficAwarenessCard
                                title="General Rules for Six-Lane Highways"
                                description="These rules ensure safety and smooth traffic flow on Kerala's six-lane highways."
                                points={[
                                    "Always maintain lane discipline.",
                                    "Use indicators before changing lanes.",
                                    "Do not overtake from the wrong side.",
                                    "Follow speed limits as per road signs.",
                                    "Keep a safe distance from vehicles ahead."
                                ]}
                            />
                            <TrafficAwarenessCard
                                title="Speed Limits"
                                description="Speed limits vary based on vehicle type and road conditions."
                                points={[
                                    "Cars: Maximum 100 km/h.",
                                    "Buses and trucks: Maximum 80 km/h.",
                                    "Two-wheelers: Maximum 70 km/h."
                                ]}
                            />
                        </>
                    )}
                </div>

                {/* Traffic Safety Tips */}
                <div className="bg-white rounded-xl shadow-lg p-6">
                    <h2 className="text-lg font-semibold mb-4">Traffic Safety Tips</h2>
                    {loading ? (
                        <p>Loading...</p>
                    ) : (
                        <TrafficAwarenessCard
                            title="Stay Safe on the Road"
                            description="Follow these tips to ensure your safety while driving on Kerala's highways."
                            points={[
                                "Wear seat belts at all times.",
                                "Avoid distractions like mobile phones.",
                                "Check mirrors frequently for blind spots.",
                                "Be cautious during heavy rain or fog.",
                                "Carry a first-aid kit in your vehicle."
                            ]}
                        />
                    )}
                </div>
            </div>

            {/* FAQs Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Frequently Asked Questions (FAQs)</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <>
                        <TrafficFAQ
                            question="What are the penalties for breaking traffic rules?"
                            answer="Penalties range from fines to license suspension, depending on the severity of the violation."
                        />
                        <TrafficFAQ
                            question="Can I use mobile phones while driving?"
                            answer="No, using mobile phones without hands-free devices is strictly prohibited and punishable by law."
                        />
                        <TrafficFAQ
                            question="What should I do in case of an accident?"
                            answer="Immediately inform the nearest police station, provide first aid if possible, and avoid moving vehicles until authorities arrive."
                        />
                        <TrafficFAQ
                            question="Are there separate lanes for slow-moving vehicles?"
                            answer="Yes, slow-moving vehicles like trucks and buses must use the outermost lanes to avoid obstructing faster traffic."
                        />
                    </>
                )}
            </div>

            {/* Emergency Contacts Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <EmergencyContacts />
            </div>
        </div>
    );
}

export default Awareness;