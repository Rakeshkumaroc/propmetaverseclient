import { useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const baseUrl = import.meta.env.VITE_APP_URL;

const propertyTypes = ["Residential", "Commercial", "Plot or Land"];

const HeroForm = ({ action }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const id = pathname.split("/").pop();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "",
    image: null,
  });
  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        image: file,
      }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handlePropertyTypeChange = (selectedType) => {
    setFormData((prevData) => ({
      ...prevData,
      property_type: prevData.property_type === selectedType ? "" : selectedType,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const apiUrl =
      action === "edit" ? `${baseUrl}/edit-hero/${id}` : `${baseUrl}/add-hero`;
    const method = action === "edit" ? "PUT" : "POST";

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("property_type", formData.property_type);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      const response = await fetch(apiUrl, {
        method,
        body: data,
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: `${action === "edit" ? "Hero updated" : "Hero added"} successfully!`,
          icon: "success",
          confirmButtonColor: "#000",
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
          },
          buttonsStyling: false,
        }).then(() => {
          setFormData({
            title: "",
            description: "",
            price: "",
            property_type: "",
            image: null,
          });
          setPreview(null);
          navigate("/admin/hero");
        });
      } else {
        const errorData = await response.json();
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `Failed to ${action === "edit" ? "update" : "add"} hero: ${errorData.message}`,
          customClass: {
            confirmButton:
              "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
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
            "bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition px-6 py-2.5 text-base font-medium",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const getData = async () => {
    try {
      const response = await fetch(`${baseUrl}/single-hero/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          property_type: data.property_type,
          image: null,
        });
        if (data.image_url) {
          setPreview(`${data.image_url}`);
        }
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
    <div className="w-full bg-white rounded-xl shadow-md p-6 md:p-8">
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col gap-2">
              <label htmlFor="title" className="text-base font-medium text-gray-800">
                Title
              </label>
              <input
                required
                type="text"
                id="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter hero title"
                className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="price" className="text-base font-medium text-gray-800">
                Price
              </label>
              <input
                type="text"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="Enter price"
                className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="text-base font-medium text-gray-800">
              Description
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-purple-500 outline-none h-28"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="image" className="text-base font-medium text-gray-800">
              Hero Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleFileChange}
              className="border-[1px] border-gray-300 rounded-lg px-4 py-3 text-base text-gray-700 file:bg-gray-50 file:border-0 file:mr-4 file:py-2 file:px-4 file:rounded-md file:text-base file:text-gray-700"
            />
            {preview && (
              <div className="mt-4">
                <img
                  src={preview}
                  alt="Hero Preview"
                  className="w-40 h-40 object-cover rounded-lg shadow-sm"
                />
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-base font-medium text-gray-800">
              Property Type
            </label>
            <div className="flex flex-wrap gap-4 border-[1px] border-gray-300 rounded-lg p-4 bg-gray-50">
              {propertyTypes.map((type) => (
                <label key={type} className="flex items-center gap-2 text-base cursor-pointer">
                  <input
                    type="radio"
                    name="property_type"
                    checked={formData.property_type === type}
                    onChange={() => handlePropertyTypeChange(type)}
                    className="w-5 h-5 text-purple-600 focus:ring-purple-500"
                  />
                  <span
                    className={`${
                      formData.property_type === type
                        ? "text-purple-700 font-medium"
                        : "text-gray-600"
                    }`}
                  >
                    {type}
                  </span>
                </label>
              ))}
            </div>
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-black text-white rounded-lg shadow-md hover:bg-black/90 transition text-base font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="w-5 h-5 border-t-2 border-white border-b-2 rounded-full animate-spin mr-2"></div>
                  Loading...
                </div>
              ) : (
                <>
                  {action === "edit" ? "Update Hero" : "Add Hero"}
                  <GoArrowUpRight className="text-xl" />
                </>
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default HeroForm;