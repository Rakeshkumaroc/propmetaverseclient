import React from "react";
import CompareTable from "../components/compare/CompareTable";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import AgentsSection from "../components/home/AgentsSection";

const ComparisonList = () => {
  return (
    <>
      <Navbar />
      <div className="px-3 mt-40 md:px-10 lg:px-20 xl:px-28 2xl:px-40">
        <CompareTable />
      </div>
      <AgentsSection />
      <Footer />
    </>
  );
};

export default ComparisonList;
