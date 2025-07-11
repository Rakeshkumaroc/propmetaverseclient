import React, { useEffect, useState } from "react";
import axios from "axios";
import TrainingMaterialCard from "../TrainingAndResources/TrainingMaterialCard";
import { toast } from "react-toastify"; // Added for error feedback

const baseUrl = import.meta.env.VITE_APP_URL; // Ensure this is defined in your .env file

const TrainingAndResources = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Added for error state

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${baseUrl}/training-materials`);
      setMaterials(res.data.materials || []);
      console.log('res.data.material',res.data);
      
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Failed to fetch training materials:", error.message);
      setError("Failed to load training materials. Please try again later.");
      toast.error("Failed to load training materials.", {
        position: "top-left",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 lg:w-full">
      {loading ? (
        <p className="text-center py-10 text-lg">Loading...</p>
      ) : error ? (
        <p className="text-center py-10 text-lg text-red-500">{error}</p>
      ) : materials.length === 0 ? (
        <p className="text-center py-10 text-lg">
          No training materials found.
        </p>
      ) : (
        materials.map((material) => (
          <TrainingMaterialCard key={material._id} material={material} />
        ))
      )}
    </div>
  );
};

export default TrainingAndResources;