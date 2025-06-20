import { MdDeleteForever } from "react-icons/md";

const RecentSearchesSection = ({ searchHistory, onDeleteSearchItem }) => {
  // Destructure onDeleteSearchItem
  return (
    <section className="bg-white shadow rounded p-6 ">
      {searchHistory.length === 0 ? (
        <p className="text-gray-600">No recent searches.</p>
      ) : (
        <ul className="space-y-2">
          {searchHistory.map((search, index) => (
            <li
              key={index} // Consider using a unique ID from the server if available
              className="border-b py-2 flex justify-between items-center" // Added flex for alignment
            >
              <div>
                <p className="text-gray-800">{search.query}</p>
                <p className="text-sm text-gray-500">
                  {new Date(search.timestamp).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => onDeleteSearchItem(search.timestamp)} // Pass timestamp for deletion
                className="text-red-600 hover:text-red-800 p-1 rounded"
              >
                <MdDeleteForever className="text-lg" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default RecentSearchesSection;
