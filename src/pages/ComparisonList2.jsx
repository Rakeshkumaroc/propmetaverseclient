import React from "react";
import CompareTable from "../components/compare/CompareTable";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Header from "../components/contact/Header";
import CompareProperties from "../components/compare/CompareProperties";

const ComparisonList2 = () => {
  return (
    <>
      <Navbar />
      <Header
        title="Properties Comparison"
        para="Compare top real estate listings side-by-side to make informed decisions. Evaluate price, location, property type, and more in one clear view. Make smarter choices with detailed comparisons at your fingertips."
      />
      <CompareProperties />

      <Footer />
    </>
  );
};

export default ComparisonList2;
