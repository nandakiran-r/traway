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
} from "lucide-react"

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4 sm:p-6 lg:p-8">
      {/* Glassmorphism Navigation */}
      <nav className="fixed top-4 left-4 right-4 bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg rounded-2xl shadow-lg z-50 px-24 max-w-7xl mx-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Car className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-2xl font-bold text-gray-900">Traway</span>
            </div>
            <div className="hidden md:block">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-64 px-4 py-2 rounded-full bg-white bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Search className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full text-gray-600 hover:bg-white hover:bg-opacity-25 focus:outline-none">
                <Bell className="h-6 w-6" />
              </button>
              <button className="p-2 rounded-full text-gray-600 hover:bg-white hover:bg-opacity-25 focus:outline-none">
                <Settings className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="User avatar"
                />
                <span className="text-sm font-medium text-gray-700">John Doe</span>
                <ChevronDown className="h-4 w-4 text-gray-500" />
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Dashboard Content */}
      <main className="pt-24 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <StatCard icon={<Map className="h-6 w-6 text-blue-600" />} title="Active Routes" value="24" change={2} />
          <StatCard
            icon={<Users className="h-6 w-6 text-green-600" />}
            title="Total Users"
            value="12,345"
            change={5.3}
          />
          <StatCard
            icon={<AlertTriangle className="h-6 w-6 text-yellow-600" />}
            title="Traffic Alerts"
            value="7"
            change={-1}
          />
          <StatCard
            icon={<Clock className="h-6 w-6 text-purple-600" />}
            title="Avg. Commute Time"
            value="28 min"
            change={-2.5}
          />
        </div>

        {/* Traffic Overview and Recent Alerts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TrafficOverview />
          </div>
          <div>
            <RecentAlerts />
          </div>
        </div>

        {/* Popular Routes */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Popular Routes</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Route
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Distance
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg. Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Traffic
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <RouteRow from="Downtown" to="Airport" distance="15 mi" time="25 min" traffic="Moderate" />
                <RouteRow from="Suburb A" to="City Center" distance="8 mi" time="20 min" traffic="Light" />
                <RouteRow from="Business Park" to="Shopping Mall" distance="12 mi" time="35 min" traffic="Heavy" />
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

function StatCard({ icon, title, value, change }) {
  const isPositive = change >= 0
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 transition-transform duration-300 hover:scale-105">
      <div className="flex items-center justify-between mb-4">
        <div className="p-3 rounded-full bg-gray-100">{icon}</div>
        <div className={`flex items-center ${isPositive ? "text-green-600" : "text-red-600"}`}>
          {isPositive ? <ArrowUp className="h-4 w-4 mr-1" /> : <ArrowDown className="h-4 w-4 mr-1" />}
          <span className="text-sm font-medium">{Math.abs(change)}%</span>
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  )
}

function TrafficOverview() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-900">Traffic Overview</h2>
        <select className="bg-gray-100 rounded-lg px-3 py-1 text-sm text-gray-700 focus:outline-none">
          <option>Today</option>
          <option>This Week</option>
          <option>This Month</option>
        </select>
      </div>
      <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
        {/* Placeholder for traffic chart */}
        <BarChart3 className="h-32 w-32 text-gray-400" />
      </div>
    </div>
  )
}

function RecentAlerts() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Recent Alerts</h2>
      <div className="space-y-4">
        <AlertItem title="Road Closure" description="Main St. closed due to construction" time="2 hours ago" />
        <AlertItem title="Heavy Traffic" description="Delays on Highway 101 northbound" time="3 hours ago" />
        <AlertItem title="Accident" description="Multi-vehicle collision on Bridge Ave" time="5 hours ago" />
      </div>
    </div>
  )
}

function AlertItem({ title, description, time }) {
  return (
    <div className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
      <AlertTriangle className="h-6 w-6 text-yellow-500 mt-1" />
      <div className="flex-1">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
  )
}

function RouteRow({ from, to, distance, time, traffic }) {
  const getTrafficColor = (traffic) => {
    switch (traffic.toLowerCase()) {
      case "light":
        return "text-green-600 bg-green-100"
      case "moderate":
        return "text-yellow-600 bg-yellow-100"
      case "heavy":
        return "text-red-600 bg-red-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  return (
    <tr>
      <td className="px-6 py-4 whitespace-nowrap">
        <div className="text-sm font-medium text-gray-900">{from}</div>
        <div className="text-sm text-gray-500">to {to}</div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{distance}</td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{time}</td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getTrafficColor(traffic)}`}>
          {traffic}
        </span>
      </td>
    </tr>
  )
}

