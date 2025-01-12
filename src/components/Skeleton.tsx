const SkeletonPost = () => {
    return (
      <div className="bg-white p-6 rounded-lg shadow-lg mb-6 animate-pulse">
        <div className="w-full h-48 bg-gray-300 rounded-md mb-4"></div>
        <div className="w-3/4 h-6 bg-gray-300 rounded mb-4"></div>
        <div className="w-5/6 h-4 bg-gray-300 rounded mb-4"></div>
        <div className="w-1/2 h-4 bg-gray-300 rounded"></div>
      </div>
    );
  };

  export default SkeletonPost;