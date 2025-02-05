import { Car, Map, BarChart3, AlertTriangle, Settings, Bell, Search, ArrowUp, ArrowDown, Store, Toilet, FileText, Truck, CarTaxiFront, Home, ScrollText, AlertCircle, Users, Shield, Menu, X, Upload, MessageCircle, Mic, MapPin, ChevronRight, Filter, Phone, LogOut,Plus } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useUser } from '@/context/UserContext'
import { useNavigate } from "react-router-dom";
import { useToast } from '@/components/ui/use-toast';
import SignIn from "@/pages/Auth/login";
import {
  Timestamp,
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  updateDoc,
  query,
  where,
  orderBy,
  limit
} from "firebase/firestore";
import { db } from "@/config/firebase";
import { useForm } from "react-hook-form";
import { toast } from "@/components/ui/use-toast";

export default function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("home");
  const [showPetitionForm, setShowPetitionForm] = useState(false);
  const [showAlertForm, setShowAlertForm] = useState(false);
  const [showTravelForm, setShowTravelForm] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user, handleSignOut } = useUser();
  const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100">


      {/* Main Dashboard Content */}
      <main className="p-8">
        {activeTab === "home" && <DashboardContent />}
        {/* {activeTab === "petitions" && <PetitionHub setShowForm={setShowPetitionForm} />}
          {activeTab === "incidents" && <IncidentReports setShowForm={setShowAlertForm} />}
          {activeTab === "travel" && <TravelTogether setShowForm={setShowTravelForm} />}
          {activeTab === "safety" && <SafetyAlerts />}
          {activeTab === "settings" && <SettingsSection />} */}
      </main>
    </div>

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
          vehicles={{ cars: 245, trucks: 38, rideshare: 52 }}
          avgSpeed="35mph"
        />
        <HighwayStatusItem
          highway="280"
          status="moderate"
          vehicles={{ cars: 180, trucks: 25, rideshare: 35 }}
          avgSpeed="55mph"
        />
        <HighwayStatusItem
          highway="880"
          status="light"
          vehicles={{ cars: 120, trucks: 15, rideshare: 28 }}
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


function ActivePetitions({ setShowForm }) {
  const { user } = useUser();
  const [petitions, setPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    async function fetchActivePetitions() {
      setLoading(true);
      try {
        const petitionsRef = collection(db, "petitions");

        const activeQuery = query(
          petitionsRef,
          // where("signatures", "<", 5000), 
          orderBy("createdAt", "desc")
        );
        const snapshot = await getDocs(activeQuery);

        setPetitions(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      } catch (error) {
        console.error("Error fetching active petitions:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivePetitions();
  }, []);

  const handleClick = () => {
    if (!user) {
      alert("please log in!")
    } else {
      navigate()
    }
  };

  // Calculate remaining days dynamically
  const calculateDaysLeft = (createdAt) => {
    if (!createdAt) return 30; // Default if no timestamp
    const endDate = new Date(createdAt.toDate());
    endDate.setDate(endDate.getDate() + 30); // Assuming 30-day active period
    const today = new Date();
    return Math.max(0, Math.ceil((endDate - today) / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 ">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Active Petitions</h2>
      <div className="max-h-[600px] overflow-auto">
        <div className="space-y-4">
          {loading ? (
            <p>Loading...</p>
          ) : petitions.length > 0 ? (
            petitions.map((petition) => (
              <PetitionItem
                key={petition.id}
                title={petition.title}
                location={petition.place}
                signatures={petition.signatures}
                goal={petition.goal}
                daysLeft={calculateDaysLeft(petition.createdAt)}
              />
            ))
          ) : (
            <p>No active petitions at the moment.</p>
          )}
        </div>
      </div>
      <Button className="w-full mt-4 text-white cursor-pointer" variant="outline" onClick={() => handleClick()}>
        <FileText className="w-4 h-4 mr-2 text-white" />
        Start New Petition
      </Button>

      {showSignIn && <SignIn onClose={() => setShowSignIn(false)} />}
    </div>
  );
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
  const { user } = useUser();
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    fetchRelocatedShops();
  }, []);

 

  const fetchRelocatedShops = async () => {
    try {
      const relocatedShopsRef = collection(db, 'shops');
      const snapshot = await getDocs(relocatedShopsRef);
      setShops(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    } catch (error) {
      console.error('Error fetching shops:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredShops = shops.filter(shop =>
    shop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    shop.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className=" bg-gray-50 p-6 rounded-2xl">
      <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Store className="h-6 w-6" />
           Recent  Relocated Shops
            </h1>
          
          </div>

          

          <div className="grid gap-6 max-h-[500px] overflow-auto">
            {loading ? (
              <div>
                <div className="text-sm text-center">Loading...</div>
              </div>
            ) : (filteredShops.length > 0 ? filteredShops.map((shop) => (
              <ShopItem
                key={shop.id}
                name={shop.name}
                oldLocation={shop.oldAddress}
                newLocation={shop.newAddress}
                date={shop.relocatedDate}
                category={shop.category}
              />
            )) : (
              <div className="text-center text-gray-500">No shops found</div>
            ))}
          </div>
      </div>

    </div>
  );
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
  );
}


function GenderNeutralBathrooms() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Restroom Finder</h2>
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






