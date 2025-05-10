import { FaClock, FaCog, FaCheckCircle } from "react-icons/fa";

const EnquiryStatusSection = ({enquiries}) => {
  // Map status to icons and colors
  const getStatusIconAndColor = (status) => {
    switch (status) {
      case "Pending":
        return { icon: <FaClock />, color: "text-yellow-500" };
      case "In Progress":
        return { icon: <FaCog />, color: "text-blue-500" };
      case "Resolved":
        return { icon: <FaCheckCircle />, color: "text-logoColor" };
      default:
        return { icon: null, color: "text-gray-500" };
    }
  };

  return (
    <section className="my-8 bg-white shadow rounded p-6">
      <h2 className="text-2xl font-semibold mb-4">Enquiry Status</h2>
      
      {enquiries.length === 0 ? (
        <div className="flex items-center justify-center py-8 text-gray-500">
          <FaClock className="text-2xl mr-2" aria-hidden="true" />
          <p>No enquiries found.</p>
        </div>
      ) : (
        <ul className="space-y-3" role="list" aria-label="Enquiry status list">
          {enquiries.map((enquiry) => {
            const { icon, color } = getStatusIconAndColor(enquiry.status);
            return (
              <li
                key={enquiry.id}
                className="flex items-start p-4 rounded border border-gray-200 transition-all duration-200 hover:bg-gray-50"
                role="listitem"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className={color}>{icon}</span>
                    <p className="font-medium text-gray-800">
                      {enquiry.propertyTitle}
                    </p>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">
                    {enquiry.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-2">
                    <p className="text-sm text-gray-500">
                      Status: <span className={color}>{enquiry.status}</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Submitted: {new Date(enquiry.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default EnquiryStatusSection;