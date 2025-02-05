import React, { useEffect, useState } from "react";
import { useUser } from '@/context/UserContext';
import SignIn from "@/pages/Auth/login";
import { OlaMaps } from '../../OlaMapsWebSDKNew/index';
import { collection, getDocs, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/config/firebase";

// Restroom Location Form Component
function AddRestroomForm({ onClose, onAddRestroom }) {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    hygieneRating: 5,
    overallRating: 5,
    description: "",
  });
  const [suggestions, setSuggestions] = useState([]);
  const [coordinates, setCoordinates] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Fetch autocomplete suggestions when the user types in the location field
    if (name === "location" && value.length > 2) {
      fetchAutocompleteSuggestions(value).then((data) => {
        setSuggestions(data.predictions || []);
      });
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    setFormData((prevData) => ({
      ...prevData,
      location: suggestion.description,
    }));
    setSuggestions([]);

    // Fetch geocode for the selected suggestion
    const geocodeData = await fetchGeocode(suggestion.description);
    const { lat, lng } = geocodeData.geocodingResults[0].geometry.location;
    setCoordinates([lat, lng]);
  };

  const fetchAutocompleteSuggestions = async (input) => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/autocomplete?input=${encodeURIComponent(input)}&api_key=${import.meta.env.VITE_OLA_MAP_API_KEY}`,
        {
          method: "GET",
          headers: {
            "X-Request-Id": "XXX",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching autocomplete suggestions:", error);
      return { predictions: [] };
    }
  };

  const fetchGeocode = async (address) => {
    try {
      const response = await fetch(
        `https://api.olamaps.io/places/v1/geocode?address=${encodeURIComponent(address)}&language=en&api_key=${import.meta.env.VITE_OLA_MAP_API_KEY}`,
        {
          method: "GET",
          headers: {
            "X-Request-Id": "XXX",
          },
        }
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching geocode:", error);
      throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!coordinates) {
      alert("Please select a valid location from the suggestions.");
      return;
    }

    const newRestroom = {
      name: formData.name,
      location: formData.location,
      latitude: coordinates[0],
      longitude: coordinates[1],
      hygieneRating: parseInt(formData.hygieneRating),
      overallRating: parseFloat(formData.overallRating),
      description: formData.description,
      timestamp: serverTimestamp(),
    };

    try {
      await onAddRestroom(newRestroom);
      alert("Restroom location added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding restroom:", error);
      alert("Error adding restroom. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Restroom Location</h2>
        <form onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter restroom name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Location Field with Autocomplete */}
          <div className="mb-4 relative">
            <label className="block text-sm font-medium text-gray-700">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Enter location"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-md mt-1 max-h-40 overflow-y-auto shadow-lg">
                {suggestions.map((suggestion, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(suggestion)}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                  >
                    {suggestion.description}
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Hygiene Rating Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Hygiene Rating</label>
            <input
              type="number"
              name="hygieneRating"
              value={formData.hygieneRating}
              onChange={handleChange}
              min="1"
              max="5"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Overall Rating Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Overall Rating</label>
            <input
              type="number"
              name="overallRating"
              value={formData.overallRating}
              onChange={handleChange}
              min="1"
              max="5"
              step="0.1"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          {/* Description Field */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Describe the restroom facilities"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          {/* Submit and Cancel Buttons */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Restrooms Component
export default function Restrooms() {
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [restrooms, setRestrooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mapInstance, setMapInstance] = useState(null);
  const [olaMapsInstance, setOlaMapsInstance] = useState(null);

  useEffect(() => {
    // Initialize OlaMaps
    const olaMaps = new OlaMaps({
      apiKey: import.meta.env.VITE_OLA_MAP_API_KEY,
    });
    setOlaMapsInstance(olaMaps);

    const myMap = olaMaps.init({
      style: "https://api.olamaps.io/tiles/vector/v1/styles/default-light-standard/style.json",
      container: 'map',
      center: [75.9952, 11.3214],
      zoom: 10,
    });
    setMapInstance(myMap);

    const geolocate = olaMaps.addGeolocateControls({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });

    myMap.addControl(geolocate);
    myMap.on('load', () => {
      geolocate.trigger();
      // We'll add markers in a separate useEffect
    });

    return () => {
      // Cleanup map instance if needed
      if (myMap) {
        myMap.remove();
      }
    };
  }, []);

  // Fetch restrooms and add markers
  useEffect(() => {
    const fetchRestrooms = async () => {
      setLoading(true);
      try {
        const restroomsRef = collection(db, "restrooms");
        const snapshot = await getDocs(restroomsRef);
        const restroomData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setRestrooms(restroomData);
        
        // Add markers if map is ready
        if (mapInstance && olaMapsInstance && restroomData.length > 0) {
          restroomData.forEach(restroom => {
            if (restroom.latitude && restroom.longitude) {
              olaMapsInstance
                .addMarker({ color: 'red' })
                .setLngLat([restroom.longitude, restroom.latitude])
                .addTo(mapInstance);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching restrooms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRestrooms();
  }, [mapInstance, olaMapsInstance]);

  const handleAddRestroom = () => {
    if (user) {
      setShowForm(true);
    } else {
      setShowLoginModal(true);
    }
  };

  const addNewRestroom = async (newRestroom) => {
    try {
      const docRef = await addDoc(collection(db, "restrooms"), newRestroom);
      const restroomWithId = { id: docRef.id, ...newRestroom };
      setRestrooms(prev => [...prev, restroomWithId]);

      // Add marker for new restroom
      if (mapInstance && olaMapsInstance) {
        olaMapsInstance
          .addMarker({ color: 'red' })
          .setLngLat([newRestroom.longitude, newRestroom.latitude])
          .addTo(mapInstance);
      }

      return docRef;
    } catch (error) {
      console.error("Error adding restroom:", error);
      throw error;
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Restroom Finder - Kerala</h1>
        {showLoginModal && <SignIn onClose={() => setShowLoginModal(false)} />}
      </div>

{/* Add Restroom Button */}
<div className="flex justify-end">
  <button
    onClick={handleAddRestroom}
    className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition duration-200"
  >
    Add New Restroom Location
  </button>
</div>

      {/* Map Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Find Restrooms Near You</h2>
        <div style={{ height: "400px" }}>
          <div id="map" style={{ width: "100%", height: "400px" }}></div>
        </div>
      </div>

      {/* Restrooms List */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-lg font-semibold mb-4">Available Restrooms</h2>
        {loading ? (
          <p className="text-gray-500">Loading...</p>
        ) : restrooms.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {restrooms.map((restroom) => (
              <div key={restroom.id} className="p-4 border rounded-lg">
                <h3 className="font-medium">{restroom.name}</h3>
                <p className="text-sm text-gray-600">{restroom.location}</p>
                <div className="mt-2">
                  <p>Hygiene: {restroom.hygieneRating}/5</p>
                  <p>Overall: {restroom.overallRating}/5</p>
                </div>
                {restroom.description && (
                  <p className="mt-2 text-sm text-gray-600">{restroom.description}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No restrooms available yet.</p>
        )}
      </div>

      {/* Add Restroom Form Modal */}
      {showForm && (
        <AddRestroomForm
          onClose={() => setShowForm(false)}
          onAddRestroom={addNewRestroom}
        />
      )}
    </div>
  );
}