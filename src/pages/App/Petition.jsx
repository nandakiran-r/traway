import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import { collection, getDocs, query, orderBy, limit, doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/config/firebase";
import { useUser } from '@/context/UserContext'
import SignIn from "@/pages/Auth/login";
import PetitionForm from './Form/PetitionForm'
import { ThumbsUp } from "lucide-react";

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

function PetitionItemTrending({ id, title, location, signatures, goal, daysLeft, signedusers }) {
  const progress = (signatures / goal) * 100;
  const { user } = useUser();
  const [signed, setSigned] = useState(false);

  useEffect(() => {
    if (user && signedusers?.includes(user.uid)) {
      setSigned(true);
    }
  }, [signedusers, user?.uid]); // Removed `signed` to prevent infinite loop

  const handleSignClick = async () => {
    if (!user) {
      console.error("User must be logged in to sign the petition.");
      return;
    }



    try {
      const petitionDocRef = doc(db, "petitions", id);

      if (signed) {
        await updateDoc(petitionDocRef, {
          signatures: signatures - 1,
          signedusers: arrayUnion(user.uid),
        });

        setSigned(false); 
        signatures -= 1;
        console.log("Petition unsigned successfully!");
        return;
      } else {
        await updateDoc(petitionDocRef, {
          signatures: signatures + 1,
          signedusers: arrayUnion(user.uid),
        });

        setSigned(true); 
        signatures += 1;
        console.log("Petition signed successfully!");
      }
    } catch (error) {
      console.error("Error signing petition:", error);
    }
  };

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
          <div className="bg-blue-600 rounded-full h-2" style={{ width: `${progress}%` }} />
        </div>
      </div>
      <div
        className={`flex items-center space-x-2 mt-4 cursor-pointer select-none ${signed ? "text-gray-500 cursor-not-allowed" : "text-blue-600"
          }`}
        onClick={signed ? null : handleSignClick}
      >
        <ThumbsUp className={`h-5 w-5 ${signed ? "text-gray-500" : "text-blue-600"}`} />
        <span className="font-medium">{signed ? "Already Signed" : "Sign this petition"}</span>
      </div>
    </div>
  );
}



function PetitionHub() {
  const { user } = useUser();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [userPetitions, setUserPetitions] = useState([]);
  const [trendingPetitions, setTrendingPetitions] = useState([]);
  const [loading, setLoading] = useState(true);
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

  async function fetchPetitions() {
    setLoading(true);
    try {
      const petitionsRef = collection(db, "petitions");

      // Fetch trending (latest 5)
      const trendingQuery = query(petitionsRef, orderBy("signatures", "desc"), limit(5));
      const trendingSnapshot = await getDocs(trendingQuery);
      setTrendingPetitions(trendingSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));


      // Fetch user-created petitions
      if (user) {
        const userQuery = query(petitionsRef, orderBy("createdAt", "desc"));
        const userSnapshot = await getDocs(userQuery);
        setUserPetitions(userSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      }
    } catch (error) {
      console.error("Error fetching petitions:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {


    fetchPetitions();
  }, [user]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Petition Hub</h1>
        <button
          onClick={() => handleShowForm(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 cursor-pointer"
        >
          <FileText className="h-5 w-5" />
          <span>Create Petition</span>
        </button>
      </div>

      {/* Petition Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Trending Petitions */}
        <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4">Trending Petitions</h2>
          <div className="space-y-4">
            {loading ? (
              <p>Loading...</p>
            ) : trendingPetitions.length > 0 ? (
              trendingPetitions.map((petition) => (
                <>
                  <PetitionItemTrending
                    key={petition.id}
                    id={petition.id}
                    title={petition.title}
                    location={petition.place}
                    signatures={petition.signatures}
                    goal={petition.goal}
                    daysLeft={15}
                  />
                </>
              ))
            ) : (
              <p>No trending petitions yet.</p>
            )}
          </div>
        </div>

        {/* User's Petitions */}
        {user && (
          <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Your Petitions</h2>
            <div className="space-y-4">
              {loading ? (
                <p>Loading...</p>
              ) : userPetitions.length > 0 ? (
                userPetitions.map((petition) => (
                  <PetitionItem
                    key={petition.id}
                    title={petition.title}
                    location={petition.place}
                    signatures={petition.signatures}
                    goal={petition.goal}
                    daysLeft={15}
                  />
                ))
              ) : (
                <p>You haven't created any petitions yet.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {!user && (<SignIn open={isLoginOpen} onClose={handleCloseLogin} />)}
      {showForm && <PetitionForm onClose={() => setShowForm(false)} refreshPetitions={fetchPetitions} />}
    </div>
  );
}

export default PetitionHub;