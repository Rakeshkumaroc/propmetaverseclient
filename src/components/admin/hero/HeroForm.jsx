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
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    property_type: "",
    image: null, // Changed from image_url to image for file handling
  });
  const [preview, setPreview] = useState(null); // For image preview

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
      setPreview(URL.createObjectURL(file)); // Generate preview URL
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

    const apiUrl =
      action === "edit" ? `${baseUrl}/edit-hero/${id}` : `${baseUrl}/add-hero`;
    const method = action === "edit" ? "PUT" : "POST";

    // Use FormData to send file and other data
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("price", formData.price);
    data.append("property_type", formData.property_type);
    if (formData.image) {
      data.append("image", formData.image); // Append the file
    }

    try {
      const response = await fetch(apiUrl, {
        method,
        body: data, // Send FormData instead of JSON
      });

      if (response.ok) {
        Swal.fire({
          title: "Success!",
          text: `${action === "edit" ? "Hero updated" : "Hero added"} successfully!`,
          confirmButtonColor: "#000",
          icon: "success",
          customClass: {
            confirmButton:
              "bg-black shadow-gray-600 hover:shadow-lg transition-all duration-200 py-2 px-10 mt-4 text-white rounded-md hover:scale-110",
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
      const response = await fetch(`${baseUrl}/single-hero/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title,
          description: data.description,
          price: data.price,
          property_type: data.property_type,
          image: null, // Reset image for edit, backend will keep old image unless replaced
        });
        if (data.image_url) {
          setPreview(`${baseUrl}/uploads/hero/${data.image_url}`); // Assuming image_url is now the filename
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
    <div className="w-full rounded-lg bg-white">
      <div className="p-8 md:mt-10">
        <form onSubmit={handleSubmit}>
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-[14px] font-semibold leading-[26px]">
                  Title
                </label>
                <input
                  required
                  type="text"
                  id="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Title"
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="price" className="text-[14px] font-semibold leading-[26px]">
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Price"
                  className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="description" className="text-[14px] font-semibold leading-[26px]">
                Description
              </label>
              <textarea
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Description"
                className="border-[1px] px-2 rounded-lg h-20 border-gray-300 text-sm py-3"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="image" className="text-[14px] font-semibold leading-[26px]">
                Hero Image
              </label>
              <input
                type="file"
                id="image"
                accept="image/*"
                onChange={handleFileChange}
                className="border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3"
              />
              {preview && (
                <div className="mt-3">
                  <img
                    src={preview}
                    alt="Hero Preview"
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold leading-[26px]">
                Property Type
              </label>
              <div className="flex gap-5 border-[1px] px-2 rounded-lg h-14 border-gray-300 text-sm py-3 justify-between">
                {propertyTypes.map((type) => (
                  <label key={type} className="flex items-center gap-2 w-[30%]">
                    <input
                      type="checkbox"
                      checked={formData.property_type === type}
                      onChange={() => handlePropertyTypeChange(type)}
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex cursor-pointer justify-center">
            <button
              type="submit"
              className="text-[15px] px-2 md:px-5 py-4 flex mt-7 items-center bg-black rounded-lg text-white"
            >
              {action === "edit" ? "Edit Hero" : "Add Hero"} <GoArrowUpRight className="text-xl" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default HeroForm;