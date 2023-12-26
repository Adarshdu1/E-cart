import React from "react";

function NotFound() {
  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-300 to-gray-100">
        <div className="text-center">
          <h1 className="text-8xl font-bold text-white mb-4 relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-green-500">
              404
            </span>
          </h1>
          <p className="text-2xl text-slate-700 mb-8 font-semibold">
            Oops! It seems like the page is missing.
          </p>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            onClick={() => window.history.back()}
          >
            Go Back
          </button>
        </div>
      </div>
    </>
  );
}

export default NotFound;
