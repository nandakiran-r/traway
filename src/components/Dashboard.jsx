import {
  Car,
  Map,
  BarChart3,
  Users,
  AlertTriangle,
  Clock,
  Settings,
  Bell,
  Search,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  LogOut,
  Store,
  Toilet,
  FileText,
  Truck,
  CarTaxiFront
} from "lucide-react"
import SignIn from "@/pages/Auth/login";
import { useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useToast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router";

export default function App() {
  const [user, setUser] = useState(null);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      toast({
        title: "Signed out successfully",
        description: "You have been logged out of your account.",
      });
      // navigate("/");
    } catch (error) {
      toast({
        title: "Error signing out",
        description: "There was a problem signing out. Please try again.",
        variant: "destructive",
      });
    }
  };

  // if (!user) {
  //   return <SignIn />;
  // } 

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4 sm:p-6 lg:p-8">
      <nav className="fixed top-0 left-0 right-0 bg-white shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Traffic Monitor</span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-5 w-5" />
              </Button>
              {user ? (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="ghost" size="sm">
                    <LogOut className="h-5 w-5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to sign out?</AlertDialogTitle>
                    <AlertDialogDescription>
                      You will need to sign in again to access the dashboard.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleSignOut}>Sign Out</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
              ) : (
                <SignIn />
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-24 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard icon={<Map className="h-6 w-6 text-blue-600" />} title="Active Routes" value="24" change={2} />
          <StatCard icon={<Store className="h-6 w-6 text-purple-600" />} title="Relocated Shops" value="8" change={3} />
          <StatCard icon={<Toilet className="h-6 w-6 text-green-600" />} title="Gender Neutral Bathrooms" value="15" change={5} />
          <StatCard icon={<AlertTriangle className="h-6 w-6 text-red-600" />} title="Active Alerts" value="12" change={-2} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <HighwayStatus />
          </div>
          <div>
            <ActivePetitions />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <RelocatedShops />
          <GenderNeutralBathrooms />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Traffic Incidents</h2>
          <div className="space-y-4">
            <IncidentItem 
              type="accident"
              icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
              title="Multi-vehicle collision"
              location="Highway 101 Northbound"
              description="3 vehicles involved. Emergency services on scene. Expect delays."
              time="10 minutes ago"
              severity="high"
            />
            <IncidentItem 
              type="heavyTraffic"
              icon={<Truck className="h-6 w-6 text-yellow-500" />}
              title="Heavy truck traffic"
              location="Interstate 280"
              description="Multiple trucks causing slowdowns. Consider alternate routes."
              time="25 minutes ago"
              severity="medium"
            />
            <IncidentItem 
              type="rideshare"
              icon={<CarTaxiFront className="h-6 w-6 text-blue-500" />}
              title="High Uber/Lyft activity"
              location="Downtown area"
              description="Increased rideshare presence causing congestion."
              time="15 minutes ago"
              severity="low"
            />
          </div>
        </div>
      </main>
    </div>
  )
}

export default function StatCard({ icon, title, value, change }) {
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

export default function HighwayStatus() {
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

export default function HighwayStatusItem({ highway, status, vehicles, avgSpeed }) {
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

export  function ActivePetitions() {
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

export default function PetitionItem({ title, location, signatures, goal, daysLeft }) {
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

export default function RelocatedShops() {
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

export default function ShopItem({ name, oldLocation, newLocation, date, category }) {
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

export default function GenderNeutralBathrooms() {
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

export default function BathroomItem({ location, amenities, status, distance }) {
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

export default function IncidentItem({ type, icon, title, location, description, time, severity }) {
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
