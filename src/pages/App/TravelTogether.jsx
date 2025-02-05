import { Car } from "lucide-react";
import { MessageCircle, ChevronRight } from "lucide-react";
import TravelForm from "./Form/TravelForm";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUser } from '@/context/UserContext'
import SignIn from "@/pages/Auth/login";
import { useState } from "react";


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



function TravelTogether() {

  const user = useUser();

  const [showForm, setShowForm] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  const handleShowForm = (show) => {
    if (user) {
      setShowForm(show);
    } else {
      handleOpenLogin();
    }
  };
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

      {!user && (<SignIn open={isLoginOpen} onClose={handleCloseLogin} />)}
      {showForm && <TravelForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default TravelTogether;