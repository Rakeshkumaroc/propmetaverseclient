import React, { useContext, useEffect, useState } from "react";
import { GoArrowUpRight } from "react-icons/go";
import { MyContext } from "../../App";

const EmiCalculator = () => {
  const [grossIncome, setGrossIncome] = useState(25000);
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [tenure, setTenure] = useState(30);
  const [interestRate, setInterestRate] = useState(8.75);
  const [otherEmis, setOtherEmis] = useState(0); 
  const [eligibility, setEligibility] = useState();
  // const eligibility=47870
  // if (tenure == 1) {
  //   setEligibility(12 * emi);
  // }

  // const calculateEmi = (loanAmount, interestRate, tenure) => {
  //   const principal = loanAmount;
  //   const rate = interestRate / 12 / 100;
  //   const months = tenure * 12;

  //   const emi =
  //     (principal * rate * Math.pow(1 + rate, months)) /
  //     (Math.pow(1 + rate, months) - 1);
  //   return emi.toFixed(2);
  // };

  // const calculateEligibility = (grossIncome, otherEmis) => {
  //   const eligibility = grossIncome * 0.5 - otherEmis;
  //   return eligibility;
  // };

  // const emi = calculateEmi(loanAmount, interestRate, tenure);
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

  // const eligibility = calculateEligibility(grossIncome, otherEmis);

  useEffect(() => {
    setEligibility(tenure * 12 * emi - (tenure * 12 * emi) / 100);
    // setEmi
  }, [emi, eligibility, tenure]);
  return (
    <div className="rounded bg-logoBlue/5 shadow-[0_10px_40px_rgba(24,26,32,.05)] p-6 py-5  w-full h-fit">
      <h3 className="text-[20px] font-semibold leading-[30px]">
        EMI Calculator
      </h3>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="grossIncome"
            className="block text-sm font-medium text-gray-700"
          >
            Gross Income (Monthly)
          </label>
          <div className="border-gray-200 flex gap-1 font-semibold justify-between items-center text-sm border-[1px] p-1 px-2 ">
            <span>₹</span>
            <input
              type="text"
              className=" outline-none w-[60px]"
              onChange={(e) => setGrossIncome(e.target.value)}
              value={grossIncome.toLocaleString()}
            />
          </div>
        </div>
        <input
          type="range"
          id="grossIncome"
          min="10000" // ₹10,000
          max="1000000" // ₹1 Cr in paise
          value={grossIncome}
          onChange={(e) => setGrossIncome(e.target.value)}
          className="mt-2 w-full accent-logoColor"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹10k</span>
          <span>₹10 Lakh</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="tenure"
            className="block text-sm font-medium text-gray-700"
          >
            Tenure (Years)
          </label>
          <div className="border-gray-200 flex font-semibold  justify-between items-center text-sm border-[1px] p-1 px-2 ">
            <input
              type="text"
              className=" outline-none w-[20px]  "
              onChange={(e) => setTenure(e.target.value)}
              value={tenure}
            />
            <span>years</span>
          </div>
        </div>
        <input
          type="range"
          id="tenure"
          min="1"
          max="35"
          value={tenure}
          onChange={(e) => setTenure(e.target.value)}
          className="mt-2 w-full accent-logoColor"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>1</span>
          <span>35</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="interestRate"
            className="block text-sm font-medium text-gray-700"
          >
            Interest Rate (% P.A.)
          </label>

          <div className="border-gray-200 flex font-semibold  justify-between items-center text-sm border-[1px] p-1 px-2 ">
            <input
              type="text"
              className=" outline-none w-[20px]  "
              onChange={(e) => setInterestRate(e.target.value)}
              value={interestRate}
            />
            <span>%</span>
          </div>
        </div>
        <input
          type="range"
          id="interestRate"
          min="0.5"
          max="15"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
          className="mt-2 w-full accent-logoColor"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>0.5%</span>
          <span>15%</span>
        </div>
      </div>

      <div className="my-4">
        <div className="flex items-center justify-between">
          <label
            htmlFor="otherEmis"
            className="block text-sm font-medium text-gray-700"
          >
            Other EMIs (Monthly)
          </label>
          <div className="text-sm border-[1px] p-1 px-2 border-gray-200  font-semibold mt-2">
            <span>₹ </span>
            <input
              type="text"
              className=" outline-none w-[60px]  font-semibold "
              onChange={(e) => setOtherEmis(e.target.value)}
              value={otherEmis.toLocaleString()}
            />
          </div>
        </div>
        <input
          type="range"
          id="otherEmis"
          min="1"
          max="500000" // 1 Crore in paise
          value={otherEmis}
          onChange={(e) => setOtherEmis(e.target.value)}
          className="mt-2 w-full accent-logoColor"
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹1</span>
          <span>₹5 Lakh</span>
        </div>
      </div>
      <div className="shadow shadow-gray-300 rounded-lg p-2">
        <p className="text-sm font-[500] flex items-center gap-5 mb-2">
          Your Home Loan Eligibility:{" "}
          <span className="text-[20px] font-semibold flex items-center leading-[30px] border border-gray-300 text-gray-700 bg-logoColor/10 p-1 px-3 rounded-md">
            ₹{eligibility > 0 ? eligibility : 0}
          </span>
        </p>

        <p className="text-sm font-[500] flex items-center gap-5">
          Your Home Loan EMI will be / monthly:{" "}
          <span className="text-[20px] font-semibold leading-[30px] border border-gray-300 text-gray-700 bg-logoColor/10 p-1 px-3 rounded-md">
            {" "}
            ₹{emi > 0 ? emi : 0}
          </span>
        </p>
      </div>
     
    </div>
  );
};

export default EmiCalculator;
