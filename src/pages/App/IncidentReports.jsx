import { AlertTriangle, Phone } from "lucide-react";
import { useUser } from '@/context/UserContext'
import SignIn from "@/pages/Auth/login";
import { useEffect, useState } from "react";
import AlertForm from './Form/AlertForm'

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


function IncidentReports() {
  const { user } = useUser(); // Get logged-in user
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
        <h1 className="text-2xl font-bold">Incident Reports</h1>
        <button
          onClick={() => setShowForm(true)}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center space-x-2"
        >
          <AlertTriangle className="h-5 w-5" />
          <span>Report Incident</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Recent Incidents</h2>
            <div className="space-y-4">
              <IncidentItem
                type="accident"
                icon={<AlertTriangle className="h-6 w-6 text-red-500" />}
                title="Major Traffic Accident"
                location="NH 66, near Kollam Bypass"
                description="Multi-vehicle collision, emergency services on scene"
                time="10 mins ago"
                severity="high"
              />
              <IncidentItem
                type="hazard"
                icon={<AlertTriangle className="h-6 w-6 text-yellow-500" />}
                title="Road Construction"
                location="Thiruvananthapuram-Kollam Highway"
                description="Single lane traffic, expect delays"
                time="1 hour ago"
                severity="medium"
              />
              <IncidentItem
                type="alert"
                icon={<AlertTriangle className="h-6 w-6 text-blue-500" />}
                title="Heavy Rain Warning"
                location="Kochi-Munnar Highway"
                description="Reduced visibility and slippery conditions"
                time="2 hours ago"
                severity="low"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Emergency Contacts</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-red-500" />
                  <span className="font-medium">Police</span>
                </div>
                <span className="text-red-600">100</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-500" />
                  <span className="font-medium">Ambulance</span>
                </div>
                <span className="text-blue-600">108</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!user && (<SignIn open={isLoginOpen} onClose={handleCloseLogin} />)}
      {showForm && <AlertForm onClose={() => setShowForm(false)} />}
    </div>
  );
}

export default IncidentReports;