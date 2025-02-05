
function PetitionForm({ onClose }) {
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
  
    const {
      register,
      handleSubmit,
      reset,
      formState: { errors },
    } = useForm();
  
    const onSubmit = async (data) => {
      if (!user) {
        toast({
          variant: "destructive",
          title: "Authentication required",
          description: "You must be logged in to create a petition.",
        });
        return;
      }
  
      try {
        setLoading(true);
        await setDoc(doc(db, "petitions", data.title), {
          title: data.title,
          description: data.description,
          signatures: 0,
          goal: 1000,
          place: data.place,
          user_id: user.uid,
          createdAt: Timestamp.now(),
        });
  
        toast({
          variant: "success",
          title: "Petition created",
          description: "Your petition has been successfully created!",
        });
  
        reset();
        onClose();
      } catch (error) {
        console.error("Error creating petition:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to create petition. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Create New Petition</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="h-5 w-5" />
            </button>
          </div>
  
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
              <input
                type="text"
                {...register("title", { required: "Title is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter petition title"
              />
              {errors.title && <p className="text-red-500 text-sm">{errors.title.message}</p>}
            </div>
  
            {/* Description Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                {...register("description", { required: "Description is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                rows={4}
                placeholder="Describe your petition"
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
            </div>
  
            {/* Place Input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                {...register("place", { required: "Location is required" })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter location of issue"
              />
              {errors.place && <p className="text-red-500 text-sm">{errors.place.message}</p>}
            </div>
  
            {/* File Upload */}
            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Supporting Documents (Optional)</label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Drag and drop files or click to upload</p>
              </div>
            </div> */}
  
            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
              >
                {loading ? "Creating..." : "Create Petition"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  