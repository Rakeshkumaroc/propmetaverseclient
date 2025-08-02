import React from "react";
import CompareTable from "../components/compare/CompareTable";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const ComparisonList = () => {
  return (
    <>
      <Navbar />
      <div className=" pb-16  mt-[70px]  xl:mt-[120px] 2xl:mt-[160px]">
        <div className="py-30 mt-1 text-[#000] bg-gradient-to-r from-[#74aedd] via-[#f9f9f9] to-white">
          <div className="md:pl-[80px] md:pr-[200px]">
            <h2 className="text-[25px] md:text-[40px] font-semibold">
              Properties Comparison
            </h2>
            <p className="mt-4 md:text-[18px] leading-relaxed text-black font-medium">
              Compare top real estate listings side-by-side to make informed
              decisions. Evaluate price, location, property type, and more in
              one clear view. Make smarter choices with detailed comparisons at
              your fingertips
            </p>
          </div>
        </div>
        <CompareTable />
      </div>
      <Footer />
    </>
  );
};

export default ComparisonList;
