import React, { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy, limit, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase"; // Ensure this path is correct for your project
import { Car, MessageCircle, ChevronRight, X } from "lucide-react";
import { useUser } from '@/context/UserContext'

function TravelTogether() {
  const [routes, setRoutes] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    time: "",
    seats: 1,
    notes: "",
  });

  const user = useUser();

  console.log(user);
  

  // Fetch routes from Firestore
  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const routesRef = collection(db, "routes");
        const q = query(routesRef, orderBy("timestamp", "desc"), limit(10));
        const querySnapshot = await getDocs(q);
        const fetchedRoutes = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setRoutes(fetchedRoutes);
      } catch (error) {
        console.error("Error fetching routes:", error);
      }
    };
    fetchRoutes();
  }, []);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Submit new route to Firestore
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "routes"), {
        ...formData,
        timestamp: serverTimestamp(), // Add timestamp for ordering
      });
      alert("Route posted successfully!");
      setShowForm(false); // Close the form
      setFormData({ from: "", to: "", date: "", time: "", seats: 1, notes: "" }); // Reset form
      window.location.reload(); // Refresh to show the new route
    } catch (error) {
      console.error("Error posting route:", error);
      alert("An error occurred while posting your route. Please try again.");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Travel Together</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <Car className="h-5 w-5" />
          <span>Post Route</span>
        </button>
      </div>

      {/* Available Routes */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Available Routes</h2>
            <div className="space-y-4">
              {routes.length > 0 ? (
                routes.map((route) => (
                  <div key={route.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <Car className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="font-medium">Driver</h3>
                          <p className="text-sm text-gray-500">{route.date} at {route.time}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
                        {route.seats} seats left
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 text-sm text-gray-600">
                      <span>{route.from}</span>
                      <ChevronRight className="h-4 w-4" />
                      <span>{route.to}</span>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>Contact Driver</span>
                      </button>
                      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm">
                        Request Seat
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No routes available yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Travel Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Post Travel Route</h2>
              <button onClick={() => setShowForm(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
                  <input
                    type="text"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Starting point"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
                  <input
                    type="text"
                    name="to"
                    value={formData.to}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="Destination"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                  <input
                    type="time"
                    name="time"
                    value={formData.time}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
                <input
                  type="number"
                  name="seats"
                  value={formData.seats}
                  onChange={handleInputChange}
                  min="1"
                  max="4"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any specific requirements or information"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Post Route
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default TravelTogether;