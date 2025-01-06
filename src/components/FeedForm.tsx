

const FeedForm = () => {
  return (
    <div>
      <div className="max-w-5xl mx-auto mt-8">
        <div className="bg-white p-6 rounded-3xl shadow-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Your Feed
          </h2>
          <div className="bg-gray-100 p-4 rounded-xl">
            <textarea
              className="w-full h-24 p-4 bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="What's on your mind?"
            />
            <div className="mt-4 flex justify-end space-x-4">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transform transition-all duration-200 ease-in-out">
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedForm;
