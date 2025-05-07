import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const userTypes = ["Admin", "Content", "Sales"];

const UserForm = ({ action }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split("/").pop();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    number: "",
    password: "",
    userType: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleUserTypeChange = (selectedType) => {
    setFormData((prevData) => ({
      ...prevData,
      userType: prevData.userType === selectedType ? "" : selectedType,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const apiUrl =
      action === "edit" ? `${baseUrl}/edit-user/${id}` : `${baseUrl}/add-user`;
    const method = action === "edit" ? "PUT" : "POST";

    try {
      const response = await fetch(apiUrl, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log(response);
      

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: `${action === "edit" ? "User updated" : "User added"} successfully!`,
          confirmButtonColor: "#000",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
          buttonsStyling: false,
        }).then(() => {
          setFormData({ username: "", email: "", number: "", password: "", userType: "" });
          navigate("/admin/user");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to ${action === "edit" ? "update" : "add"} user: ${errorData.message}`,
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
          },
        });
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred",
        customClass: {
          confirmButton:
            "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
        },
      });
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(`${baseUrl}/single-user/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData(data);
      } else {
        console.error("Error fetching data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (action === "edit") {
      getData();
    }
  }, [action]);

  return (
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 md:mt-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="username" className="text-[14px] font-semibold leading-[26px]">Username</label>
                <input required type="text" id="username" value={formData.username} onChange={handleChange} placeholder="Username" className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-[14px] font-semibold leading-[26px]">Email</label>
                <input required type="email" id="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="number" className="text-[14px] font-semibold leading-[26px]">Number</label>
                <input required type="text" id="number" value={formData.number} onChange={handleChange} placeholder="Number" className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-[14px] font-semibold leading-[26px]">Password</label>
                <input required type="text" id="password" value={formData.password} onChange={handleChange} placeholder="Password" className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3" />
              </div>
            </div>
            <div className="flex flex-col gap-2 ">
              <label className="text-[14px] font-semibold leading-[26px]">User Type</label>
              <div className="flex gap-5 border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 justify-between">
                {userTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 w-[30%]">
                    <input type="checkbox"   checked={formData.userType === type} onChange={() => handleUserTypeChange(type)} />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer justify-center">
            <button type="submit" className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white">
              {action === "edit" ? "Edit User" : "Add User"} <GoArrowUpRight className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
