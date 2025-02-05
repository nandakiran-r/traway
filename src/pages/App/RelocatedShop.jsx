import React, { useEffect, useState } from 'react';
import { Store, MapPin, Search, Plus, X } from 'lucide-react';
import { useUser } from '@/context/UserContext'
import SignIn from "@/pages/Auth/login";
import RelocatedForm from './Form/RelocatedForm';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/config/firebase';


const categories = ['Grocery', 'Electronics', 'Cafe', 'Restaurant', 'Retail', 'Services', 'Other'];

export default function RelocatedShops() {
  const { user } = useUser();
  const [shops, setShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleOpenLogin = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLogin = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    fetchRelocatedShops();
  }, []);

  const handleShowForm = (show) => {
    if (user) {
      setShowForm(show);
    } else {
      handleOpenLogin();
    }
  };

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
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Store className="h-6 w-6" />
              Relocated Shops
            </h1>
            <button
              onClick={() => setShowForm(true)}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="h-5 w-5" />
              Add New Shop
            </button>
          </div>

          <div className="mb-6 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search shops by name or category..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>


          <div className="grid gap-6">
            {loading ? (
              <div>
                <div className="text-sm text-center">Loading...</div>
              </div>) : (filteredShops.length > 0 ? filteredShops.map((shop) => (
                <div key={shop.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{shop.name}</h3>
                      <span className="inline-block mt-1 px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                        {shop.category}
                      </span>
                    </div>
                    <span className="text-gray-500 text-sm">{shop.relocatedDate}</span>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">Previous Location</p>
                        <p className="text-gray-700">{shop.oldAddress}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-green-500 mt-1" />
                      <div>
                        <p className="text-gray-500 text-sm">New Location</p>
                        <p className="text-gray-700">{shop.newAddress}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="text-center text-gray-500">No shops found</div>
              ))}
          </div>
        </div>
      </div>

      {!user && (<SignIn open={isLoginOpen} onClose={handleCloseLogin} />)}
      {showForm && <RelocatedForm onClose={() => setShowForm(false)} refreshPetitions={fetchRelocatedShops} />}
    </div>
  );
}