import React from "react";

const RecentSearchesSection = ({ searchHistory }) => {
  return (
    <section className="bg-white shadow rounded p-6 ">
      <h2 className="text-2xl font-semibold mb-4">Recent Searches</h2>
      {searchHistory.length === 0 ? (
        <p className="text-gray-600">No recent searches.</p>
      ) : (
        <ul className="space-y-2">
          {searchHistory.map((search, index) => (
            <li key={index} className="border-b py-2">
              <p className="text-gray-800">{search.query}</p>
              <p className="text-sm text-gray-500">
                {new Date(search.timestamp).toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentSearchesSection;