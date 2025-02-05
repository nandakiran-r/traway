import { X, MapPin, Mic } from 'lucide-react';
import { useState } from 'react';
import { useUser } from '@/context/UserContext';
import { useToast } from "@/components/ui/use-toast";

function AlertForm({ onClose }) {
  const [location, setLocation] = useState('');
  const [type, setType] = useState('Traffic Accident');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const user = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    const recipientEmail = user?.email;
    const reportData = { location, type, description, recipientEmail };
    const apiKey = import.meta.env.VITE_BASE_URL;
    if (location === '' || description === '') {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields.",
      });
      return;
    }
    try {
      const response = await fetch(`${apiKey}/api/send-report`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "Report sent",
          description: "Thank you for reporting the incident.",
        });
        onClose();
      } else {
        alert("Failed to send report.");
      }
    } catch (error) {
      console.error("Error reporting incident:", error);
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Report Incident</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
            <div className="relative">
              <input
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 pl-10"
                placeholder="Current location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Incident Type</label>
            <select
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option>Traffic Accident</option>
              <option>Road Closure</option>
              <option>Hazard</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={4}
              placeholder="Describe the incident"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
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
              disabled={loading}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-700/50"
            >
             {loading ? 'Sending...' : ' Report Emergency'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AlertForm;
