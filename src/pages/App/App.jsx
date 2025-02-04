import { Car, Map, BarChart3, AlertTriangle, Settings, Bell, Search, ArrowUp, ArrowDown, Store, File as Toilet, FileText, Truck, CarTaxiFront, Home, ScrollText, AlertCircle, Users, Shield, Menu, X, Upload, MessageCircle, Mic, MapPin, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [showPetitionForm, setShowPetitionForm] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [showTravelForm, setShowTravelForm] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 h-full bg-white shadow-xl transition-all duration-300 z-50 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Car className="h-8 w-8 text-blue-600" />
            {isSidebarOpen && <span className="text-xl font-bold">Traway</span>}
          </div>
          <button onClick={toggleSidebar} className="p-2 rounded-lg hover:bg-gray-100">
            {isSidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
        
        <nav className="mt-8 px-4">
          <SidebarLink icon={<Home />} text="Home" active={activeTab === "home"} expanded={isSidebarOpen} onClick={() => setActiveTab("home")} />
          <SidebarLink icon={<ScrollText />} text="Petition Hub" active={activeTab === "petitions"} expanded={isSidebarOpen} onClick={() => setActiveTab("petitions")} />
          <SidebarLink icon={<AlertCircle />} text="Incident Reports" active={activeTab === "incidents"} expanded={isSidebarOpen} onClick={() => setActiveTab("incidents")} />
          <SidebarLink icon={<Users />} text="Travel Together" active={activeTab === "travel"} expanded={isSidebarOpen} onClick={() => setActiveTab("travel")} />
          <SidebarLink icon={<Shield />} text="Safety Alerts" active={activeTab === "safety"} expanded={isSidebarOpen} onClick={() => setActiveTab("safety")} />
          <SidebarLink icon={<Settings />} text="Settings" active={activeTab === "settings"} expanded={isSidebarOpen} onClick={() => setActiveTab("settings")} />
        </nav>
      </aside>

      {/* Main Content */}
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'ml-64' : 'ml-20'}`}>
        {/* Top Navigation */}
        <nav className="bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg shadow-lg p-4">
          <div className="flex items-center justify-between max-w-7xl mx-auto">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 px-4 py-2 rounded-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:bg-white hover:bg-opacity-25 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <div className="h-8 w-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
                JD
              </div>
            </div>
          </div>
        </nav>

        {/* Main Dashboard Content */}
        <main className="p-8">
          {activeTab === "home" && <DashboardContent />}
          {activeTab === "petitions" && <PetitionHub setShowForm={setShowPetitionForm} />}
          {activeTab === "incidents" && <IncidentReports setShowForm={setShowAlertForm} />}
          {activeTab === "travel" && <TravelTogether setShowForm={setShowTravelForm} />}
          {activeTab === "safety" && <SafetyAlerts />}
          {activeTab === "settings" && <Settings />}
        </main>
      </div>

      {/* Modal Forms */}
      {showPetitionForm && <PetitionForm onClose={() => setShowPetitionForm(false)} />}
      {showAlertForm && <AlertForm onClose={() => setShowAlertForm(false)} />}
      {showTravelForm && <TravelForm onClose={() => setShowTravelForm(false)} />}
    </div>
  );
}

function SidebarLink({ icon, text, active, expanded, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center space-x-3 p-3 rounded-lg mb-2 transition-colors ${
        active ? 'bg-blue-50 text-blue-600' : 'hover:bg-gray-100 text-gray-600'
      }`}
    >
      {icon}
      {expanded && <span className="font-medium">{text}</span>}
    </button>
  );
}

function DashboardContent() {
  return (
    <div className="space-y-8">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={<Map className="h-6 w-6 text-blue-600" />} title="Active Routes" value="24" change={2} />
        <StatCard icon={<Store className="h-6 w-6 text-purple-600" />} title="Relocated Shops" value="8" change={3} />
        <StatCard icon={<Toilet className="h-6 w-6 text-green-600" />} title="Gender Neutral Bathrooms" value="15" change={5} />
        <StatCard icon={<AlertTriangle className="h-6 w-6 text-red-600" />} title="Active Alerts" value="12" change={-2} />
      </div>

      {/* Main Content Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <HighwayStatus />
        </div>
        <div>
          <ActivePetitions />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RelocatedShops />
        <GenderNeutralBathrooms />
      </div>
    </div>
  );
}

function PetitionHub({ setShowForm }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Petition Hub</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2"
        >
          <FileText className="h-5 w-5" />
          <span>Create Petition</span>
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Trending Petitions</h2>
          {/* Trending petitions list */}
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-lg font-semibold mb-4">Your Petitions</h2>
          {/* User's petitions list */}
        </div>
      </div>
    </div>
  );
}

function PetitionForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Create New Petition</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter petition title"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe your petition"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents</label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <p className="text-sm text-gray-500">Drag and drop files or click to upload</p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Create Petition
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function AlertForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Report Incident</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Current location"
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
            <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500">
              <option>Traffic Accident</option>
              <option>Road Closure</option>
              <option>Hazard</option>
              <option>Other</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <div className="relative">
              <textarea
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe the incident"
              />
              <button
                type="button"
                className="absolute right-3 bottom-3 p-2 bg-gray-100 rounded-full hover:bg-gray-200"
              >
                <Mic className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              Report Emergency
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function TravelForm({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Post Travel Route</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Starting point"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Destination"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
              <input
                type="time"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Available Seats</label>
            <input
              type="number"
              min="1"
              max="4"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Any specific requirements or information"
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
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
  );
}

function TravelTogether({ setShowForm }) {
  return (
    <div className="space-y-6">
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
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Available Routes</h2>
            <div className="space-y-4">
              <TravelRoute
                driver="John Doe"
                from="Downtown"
                to="Airport"
                date="Today"
                time="2:30 PM"
                seats={3}
              />
              <TravelRoute
                driver="Jane Smith"
                from="Suburb"
                to="City Center"
                date="Tomorrow"
                time="9:00 AM"
                seats={2}
              />
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Your Travel Plans</h2>
            {/* Travel plans list */}
          </div>
        </div>
      </div>
    </div>
  );
}

function TravelRoute({ driver, from, to, date, time, seats }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
            <Car className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-medium">{driver}</h3>
            <p className="text-sm text-gray-500">{date} at {time}</p>
          </div>
        </div>
        <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm">
          {seats} seats left
        </span>
      </div>
      
      <div className="flex items-center space-x-3 text-sm text-gray-600">
        <span>{from}</span>
        <ChevronRight className="h-4 w-4" />
        <span>{to}</span>
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
  );
}


 function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between">
        {icon}
        <span className={`text-sm font-medium ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          {change >= 0 ? <ArrowUp className="h-4 w-4 inline" /> : <ArrowDown className="h-4 w-4 inline" />}
          {Math.abs(change)}%
        </span>
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mt-4">{value}</h3>
      <p className="text-gray-500 text-sm mt-1">{title}</p>
    </div>
  )
}

 function HighwayStatus() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Highway Status</h2>
        <Button variant="outline" size="sm" className="text-white cursor-pointer">Refresh</Button>
      </div>
      <div className="space-y-4">
        <HighwayStatusItem 
          highway="101"
          status="heavy"
          vehicles={{cars: 245, trucks: 38, rideshare: 52}}
          avgSpeed="35mph"
        />
        <HighwayStatusItem 
          highway="280"
          status="moderate"
          vehicles={{cars: 180, trucks: 25, rideshare: 35}}
          avgSpeed="55mph"
        />
        <HighwayStatusItem 
          highway="880"
          status="light"
          vehicles={{cars: 120, trucks: 15, rideshare: 28}}
          avgSpeed="65mph"
        />
      </div>
    </div>
  )
}

 function HighwayStatusItem({ highway, status, vehicles, avgSpeed }) {
  const statusColors = {
    light: "bg-green-100 text-green-800",
    moderate: "bg-yellow-100 text-yellow-800",
    heavy: "bg-red-100 text-red-800"
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          <span className="text-lg font-bold text-gray-900">#{highway}</span>
        </div>
        <div>
          <span className={`px-2 py-1 rounded-full text-sm font-medium ${statusColors[status]}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
          <div className="mt-1 text-sm text-gray-500">
            {vehicles.cars} cars • {vehicles.trucks} trucks • {vehicles.rideshare} rideshare
          </div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-lg font-semibold text-gray-900">{avgSpeed}</div>
        <div className="text-sm text-gray-500">Avg Speed</div>
      </div>
    </div>
  )
}

  function ActivePetitions() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Petitions</h2>
      <div className="space-y-4">
        <PetitionItem 
          title="New Traffic Light Installation"
          location="Oak & Pine St"
          signatures={1250}
          goal={2000}
          daysLeft={15}
        />
        <PetitionItem 
          title="Bike Lane Extension"
          location="Downtown Area"
          signatures={850}
          goal={1000}
          daysLeft={7}
        />
        <PetitionItem 
          title="Bus Route Addition"
          location="Westside"
          signatures={450}
          goal={1500}
          daysLeft={30}
        />
      </div>
      <Button className="w-full mt-4 text-white cursor-pointer" variant="outline">
        <FileText className="w-4 h-4 mr-2 text-white" />
        Start New Petition
      </Button>
    </div>
  )
}

 function PetitionItem({ title, location, signatures, goal, daysLeft }) {
  const progress = (signatures / goal) * 100;
  
  return (
    <div className="p-4 bg-gray-50 rounded-lg">
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{location}</p>
        </div>
        <span className="text-sm text-orange-600 font-medium">{daysLeft} days left</span>
      </div>
      <div className="mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span>{signatures} signatures</span>
          <span>{goal} goal</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 rounded-full h-2" 
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  )
}

 function RelocatedShops() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recently Relocated Shops</h2>
      <div className="space-y-4">
        <ShopItem 
          name="Green Grocery"
          oldLocation="123 Main St"
          newLocation="456 Oak Ave"
          date="2024-03-15"
          category="Grocery"
        />
        <ShopItem 
          name="Tech Hub"
          oldLocation="789 Pine St"
          newLocation="321 Maple Rd"
          date="2024-03-10"
          category="Electronics"
        />
        <ShopItem 
          name="Coffee House"
          oldLocation="444 Elm St"
          newLocation="555 Cedar Ln"
          date="2024-03-05"
          category="Cafe"
        />
      </div>
    </div>
  )
}

 function ShopItem({ name, oldLocation, newLocation, date, category }) {
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Store className="h-6 w-6 text-purple-600 mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{name}</h3>
          <span className="text-xs text-gray-500">{date}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">
          Moved from {oldLocation} to {newLocation}
        </p>
        <span className="inline-block mt-2 px-2 py-1 text-xs font-medium text-purple-600 bg-purple-100 rounded-full">
          {category}
        </span>
      </div>
    </div>
  )
}

 function GenderNeutralBathrooms() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Gender Neutral Bathrooms</h2>
      <div className="space-y-4">
        <BathroomItem 
          location="City Mall - 1st Floor"
          amenities={["Wheelchair Accessible", "Baby Changing"]}
          status="Available"
          distance="0.2 miles"
        />
        <BathroomItem 
          location="Central Station"
          amenities={["Wheelchair Accessible"]}
          status="Occupied"
          distance="0.5 miles"
        />
        <BathroomItem 
          location="Public Library"
          amenities={["Wheelchair Accessible", "Baby Changing", "Shower"]}
          status="Available"
          distance="0.8 miles"
        />
      </div>
    </div>
  )
}

 function BathroomItem({ location, amenities, status, distance }) {
  const statusColor = status === "Available" ? "text-green-600 bg-green-100" : "text-yellow-600 bg-yellow-100";
  
  return (
    <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
      <Toilet className="h-6 w-6 text-green-600 mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{location}</h3>
          <span className="text-xs text-gray-500">{distance}</span>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {amenities.map((amenity, index) => (
            <span key={index} className="px-2 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
              {amenity}
            </span>
          ))}
        </div>
        <span className={`inline-block mt-2 px-2 py-1 text-xs font-medium rounded-full ${statusColor}`}>
          {status}
        </span>
      </div>
    </div>
  )
}

 function IncidentItem({ type, icon, title, location, description, time, severity }) {
  const severityColors = {
    high: "border-red-500",
    medium: "border-yellow-500",
    low: "border-blue-500"
  }
  
  return (
    <div className={`flex items-start space-x-4 p-4 bg-gray-50 rounded-lg border-l-4 ${severityColors[severity]}`}>
      {icon}
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <span className="text-xs text-gray-500">{time}</span>
        </div>
        <p className="text-sm text-gray-600 mt-1">{location}</p>
        <p className="text-sm text-gray-500 mt-1">{description}</p>
      </div>
    </div>
  )
}
