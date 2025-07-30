 
import { useEffect, useState } from "react";

const EmiCalculator = ({ developer, constructionYear }) => {
  const [grossIncome, setGrossIncome] = useState(25000);
  const [tenure, setTenure] = useState(30);
  const [interestRate, setInterestRate] = useState(8.75);
  const [otherEmis, setOtherEmis] = useState(0);
  const [eligibility, setEligibility] = useState();

  // EMI Logic calculation
  const emi =
    Math.floor(
      grossIncome < 25000
        ? grossIncome * 0.4
        : grossIncome < 50000
        ? grossIncome * 0.45
        : grossIncome < 100000
        ? grossIncome * 0.5
        : grossIncome * 0.55
    ) - otherEmis;

  useEffect(() => {
    setEligibility(tenure * 12 * emi - (tenure * 12 * emi) / 100);
  }, [emi, tenure]);

  return ( 
    <div className="flex-1 mb-8 sm:mb-12 md:mb-16 lg:mb-20 2xl:mb-[135px]"> 
      <h3 className="text-xl sm:text-2xl md:text-3xl 2xl:text-[32px] mb-4 sm:mb-5 2xl:mb-[38px] font-semibold text-gray-800 text-start">
        EMI Calculator
      </h3> 
      <div className="border border-logoBlue text-center rounded-lg p-4 sm:p-5 2xl:p-[16px] mb-4 sm:mb-5 2xl:mb-6 shadow-sm"> {/* Added shadow-sm */}
        {/* Responsive font size for "Total Income" label */}
        <p className="text-gray-500 text-base sm:text-lg 2xl:text-[24px]">Total Income</p>
        {/* Responsive font size for income value */}
        <h2 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-semibold">
          Rs.{grossIncome.toLocaleString("en-IN")}
        </h2>
        {/* Responsive font size for developer/year info */}
        <p className="text-gray-600 text-base sm:text-lg 2xl:text-[24px]">
          {developer} • {constructionYear}
        </p>
      </div> 
      <div className="mb-8 sm:mb-10 2xl:mb-[40px] p-4 sm:p-5 2xl:p-[16px] text-center">
        {/* Responsive font size for "Loan Amount" label */}
        <p className="text-gray-500 mb-1 sm:mb-2 text-base sm:text-lg 2xl:text-[24px]">Loan Amount</p>
        {/* Responsive font size for loan amount value */}
        <h3 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-semibold mb-8 sm:mb-10 ">
          ₹{grossIncome.toLocaleString("en-IN")}
        </h3>
        <input
          type="range"
          min="10000"
          max="1000000"
          value={grossIncome}
          onChange={(e) => setGrossIncome(Number(e.target.value))}
          className="w-full accent-logoBlue h-2 rounded-lg cursor-pointer bg-gray-200" // Added styling for the range input
        />
      </div>
 
      <div className="mb-8 sm:mb-10 2xl:mb-[40px] p-4 sm:p-5 2xl:p-[16px] text-center">
        {/* Responsive font size for "Loan Period" label */}
        <p className="text-gray-500 mb-1 sm:mb-2 text-base sm:text-lg 2xl:text-[24px]">Loan Period</p>
        {/* Responsive font size for loan period value */}
        <h3 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-semibold mb-8 sm:mb-10 ">
          {tenure} Years
        </h3>
        <input
          type="range"
          min="1"
          max="35"
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="w-full accent-logoBlue h-2 rounded-lg cursor-pointer bg-gray-200" // Added styling for the range input
        />
      </div>

   
      <div className="mb-8 sm:mb-10 2xl:mb-[40px] p-4 sm:p-5 2xl:p-[16px] text-center">
        {/* Responsive font size for "Interest Rate" label */}
        <p className="text-gray-500 mb-1 sm:mb-2 text-base sm:text-lg 2xl:text-[24px]">Interest Rate</p>
        {/* Responsive font size for interest rate value */}
        <h3 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-semibold mb-8 sm:mb-10 ">
          {interestRate}%
        </h3>
        <input
          type="range"
          min="0.5"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="w-full accent-logoBlue h-2 rounded-lg cursor-pointer bg-gray-200" // Added styling for the range input
        />
      </div>

 
      <div className="mb-8 sm:mb-10 2xl:mb-[40px] p-4 sm:p-5 2xl:p-[16px] text-center">
        {/* Responsive font size for "Other EMIs" label */}
        <p className="text-gray-500 mb-1 sm:mb-2 text-base sm:text-lg 2xl:text-[24px]">Other EMIs</p>
        {/* Responsive font size for other EMIs value */}
        <h3 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-semibold mb-8 sm:mb-10 ">
          ₹{otherEmis.toLocaleString("en-IN")}
        </h3>
        <input
          type="range"
          min="0"
          max="500000"
          value={otherEmis}
          onChange={(e) => setOtherEmis(Number(e.target.value))}
          className="w-full accent-logoBlue h-2 rounded-lg cursor-pointer bg-gray-200" // Added styling for the range input
        />
      </div>
 
      <div className="bg-[#FFFCFC] rounded-xl flex flex-col gap-8 sm:gap-10 2xl:gap-[56px] p-4 sm:p-5 2xl:p-[16px] text-start shadow-md"> {/* Added shadow-md */}
        {/* Responsive font size for "Estimated monthly installments" label */}
        <p className="text-gray-500 text-xl sm:text-2xl md:text-3xl 2xl:text-[36px] font-[500]">Estimated monthly installments</p>
        <div>
          {/* Responsive font size for EMI value */}
          <h3 style={{ color: "black" }} className="text-xl sm:text-2xl md:text-3xl 2xl:text-[40px] font-bold">
            RS. {emi > 0 ? emi.toLocaleString("en-IN") : 0}
          </h3>
          {/* Responsive font size and top margin for disclaimer */}
          <p className="text-sm sm:text-base 2xl:text-[24px] text-gray-500 mt-1 sm:mt-2">
            Installment fees may change according to the results of the
            verification of the physical condition of the vehicle at the branch
            office.
          </p>
        </div> 
        <button className="w-full bg-logoBlue hover:bg-logoBlue/90 text-white font-semibold py-2 sm:py-3 rounded-xl transition-colors duration-200">
          APPLY
        </button>
      </div>
    </div>
  );
};

export default EmiCalculator;
