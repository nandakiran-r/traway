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