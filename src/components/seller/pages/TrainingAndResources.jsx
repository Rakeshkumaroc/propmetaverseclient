import React, { useEffect, useState } from "react";
import axios from "axios";
import TrainingMaterialCard from "../TrainingAndResources/TrainingMaterialCard";

const baseUrl = import.meta.env.VITE_APP_URL; // Ensure this is defined in your .env file



const TrainingAndResources = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMaterials = async () => {
    try {
      const res = await axios.get(`${baseUrl}/training-materials`);
      console.log(res.data);
      setMaterials(res.data.materials || []);
    } catch (error) {
      console.error("Failed to fetch training materials:", error.message);
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
      ) : materials.length === 0 ? (
        <p className="text-center py-10 text-lg">
          No training materials found.
        </p>
      ) : (
        materials.map((material, index) => (
          <TrainingMaterialCard key={index} material={material} />
        ))
      )}
    </div>
  );
};

export default TrainingAndResources;
