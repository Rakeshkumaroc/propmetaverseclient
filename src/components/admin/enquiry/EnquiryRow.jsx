import { IoMdEye } from "react-icons/io";

const EnquiryRow = ({ item, index, selectedIds, handleCheckboxChange, setIsOpenEnquiry }) => {
  return (
    <tr className="border-b hover:bg-gray-50 transition">
      <td className="p-3">
        <input
          type="checkbox"
          checked={selectedIds.includes(item._id)}
          onChange={() => handleCheckboxChange(item._id)}
          className="w-4 h-4"
        />
      </td>
      <td className="p-3">{index + 1}</td>
      <td className="p-3 flex items-center gap-3">
        {item.image ? (
          <img src={item.image} alt="avatar" className="w-8 h-8 rounded-full" />
        ) : (
          <div className="w-8 h-8 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-semibold uppercase">
            {item.name?.[0] || "?"}
          </div>
        )}
        <div className="flex flex-col">
          <span className="font-medium">{item.name || "N/A"}</span>
          {item.username && (
            <span className="text-xs text-gray-400">@{item.username}</span>
          )}
        </div>
      </td>
      <td className="p-3">{item.phone || "N/A"}</td>
      <td className="p-3">{item.email || "N/A"}</td>
      <td className="p-3 text-center">
        <IoMdEye
          className="text-xl text-gray-700 hover:text-black text-center mx-auto cursor-pointer"
          onClick={() => setIsOpenEnquiry(item)}
        />
      </td>
    </tr>
  );
};

export default EnquiryRow;