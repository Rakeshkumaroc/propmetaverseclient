const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    return (
      <div className="flex justify-center mt-10 gap-3 flex-wrap items-center">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`w-10 h-10 rounded-lg font-medium ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          &larr;
        </button>
  
        {/* Page Numbers */}
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => onPageChange(index + 1)}
            className={`w-10 h-10 rounded-lg font-medium ${
              currentPage === index + 1
                ? "bg-logoBlue text-white"
                : "bg-gray-100 text-black hover:bg-gray-200"
            }`}
          >
            {index + 1}
          </button>
        ))}
  
        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`w-10 h-10 rounded-lg font-medium ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-gray-100 text-black hover:bg-gray-200"
          }`}
        >
          &rarr;
        </button>
      </div>
    );
  };
  
  export default Pagination;