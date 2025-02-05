import { Camera, UploadCloud } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase"; // Ensure this path is correct for your project

function Report() {
    const [showForm, setShowForm] = useState(false);
    const [reports, setReports] = useState([]);
    const [formData, setFormData] = useState({
        description: '',
        location: '',
    });
    const [loading, setLoading] = useState(true); // Loading state

    // Fetch reports from Firestore
    useEffect(() => {
        async function fetchReports() {
            setLoading(true); // Start loading
            try {
                const reportsRef = collection(db, "reports");

                // Fetch all reports, ordered by timestamp (latest first)
                const reportsQuery = query(reportsRef, orderBy("timestamp", "desc"), limit(10));
                const reportsSnapshot = await getDocs(reportsQuery);
                setReports(reportsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
            } catch (error) {
                console.error("Error fetching reports:", error);
            } finally {
                setLoading(false); // Stop loading
            }
        }

        fetchReports();
    }, []);

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Submit report to Firestore
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Hardcoded image URL
            const hardcodedImageUrl = "https://dummyimage.com/600x400/000/fff";

            // Add report to Firestore
            await addDoc(collection(db, "reports"), {
                description: formData.description,
                location: formData.location,
                image: hardcodedImageUrl, // Use hardcoded image URL
                timestamp: serverTimestamp(), // Add timestamp for ordering
            });

            // Show success message
            alert("Thank you for your report! You've earned 10 credits.");
        } catch (error) {
            console.error("Error submitting report:", error);
            alert("An error occurred while submitting your report. Please try again.");
        } finally {
            // Close the form and reset the form data
            setShowForm(false);
            setFormData({ description: '', location: '' });
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold">Anonymous Traffic Violation Reporting</h1>
            </div>

            {/* Anonymous Reporting Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Help Us Improve Road Safety</h2>
                <p className="text-sm text-gray-600 mb-4">
                    Report traffic violations anonymously and contribute to safer roads. Earn 10 credits for each valid report!
                </p>
                <button
                    onClick={() => setShowForm(true)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                >
                    <Camera className="h-5 w-5" />
                    <span>Report Now</span>
                </button>
            </div>

            {/* Reports Section */}
            <div className="bg-white rounded-xl shadow-lg p-6">
                <h2 className="text-lg font-semibold mb-4">Recent Reports</h2>
                {loading ? (
                    <p className="text-gray-500">Loading...</p> // Show loading message
                ) : reports.length > 0 ? (
                    <ul className="space-y-4">
                        {reports.map((report) => (
                            <li key={report.id} className="p-4 bg-gray-50 rounded-lg">
                                <h3 className="font-medium text-gray-900">{report.location}</h3>
                                <p className="text-sm text-gray-600">{report.description}</p>
                                <img
                                    src={report.image}
                                    alt="Report Evidence"
                                    className="mt-2 w-full h-40 object-cover rounded-md"
                                />
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-500">No reports available yet.</p>
                )}
            </div>

            {/* Form Popup */}
            {showForm && (
                <div className="fixed inset-0 bg-[rgba(0,0,0,.5)] flex justify-center items-center z-50">
                    <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full">
                        <h2 className="text-xl font-bold mb-4">Report Traffic Violation</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    placeholder="Describe the violation..."
                                    rows="3"
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                ></textarea>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleInputChange}
                                    placeholder="Enter location..."
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                                <p className="text-gray-500">A default image will be used for your report.</p>
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Submit Report
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Report;