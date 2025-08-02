import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

const PricingPolicy = () => {
  return (
    <>
      <Navbar />
      <main className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white md:mt-24 mt-5">
        <div className="max-w-4xl mx-auto text-gray-800">
          <h2 className="text-3xl md:text-4xl font-bold text-logoBlue text-center mb-6">
            Pricing Policy
          </h2>
          <p className="text-sm md:text-base text-gray-600 text-center mb-8">
            Effective Date: April 28, 2025
          </p>

          <section className="mb-10">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-logoBlue">
                Prop Metaverse Private Limited
              </span>{" "}
              . This Pricing Policy
              explains how we structure, display, and manage our service pricing
              for clients using our website{" "}
              <a
                href="https://propmetaverse.com"
                className="text-logoColor hover:underline"
              >
               https://propmetaverse.com
              </a>{" "}
               or availing our services offline.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              By using our Website or services, you agree to this Pricing
              Policy.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              1. Scope of the Policy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              This Pricing Policy applies to all services offered by Prop
              Metaverse, including:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>Real Estate Consulting Services</li>
              <li>Brokerage and Transaction Facilitation</li>
              <li>Investment Advisory and Management Services</li>
              <li>
                Ancillary Services (Property Listings, Documentation Assistance,
                Financing, Insurance Coordination, etc.)
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              It does not govern pricing set independently by third-party
              developers, banks, insurance companies, or other partners.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              2. Service Pricing Structure
            </h2>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                a) Consulting and Advisory Services
              </h3>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>
                  Consulting fees are determined based on the scope, complexity,
                  and duration of the engagement.
                </li>
                <li>
                  Pricing may be offered as a fixed fee, hourly rate, or
                  percentage of transaction value based on the service
                  agreement.
                </li>
                <li>
                  Customized consulting packages may be offered based on client
                  needs.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                b) Brokerage and Transaction Services
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                <strong>
                  Primary Sales (Under Construction and Off-Plan Properties):
                </strong>
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>No brokerage is charged to clients.</li>
                <li>
                  Brokerage is paid by the developer to Prop Metaverse as per
                  agreed terms.
                </li>
              </ul>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
                <strong>
                  Ready-to-Move Properties Purchased Directly from Developers:
                </strong>
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>No brokerage is charged to clients.</li>
                <li>
                  We receive our brokerage from the developer under our
                  authorized channel partner agreements.
                </li>
              </ul>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
                <strong>
                  Secondary Sales (Resale Properties / Land Transactions):
                </strong>
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>
                  2% of the transaction value, payable by the buyer and/or
                  seller, unless agreed otherwise.
                </li>
                <li>
                  For land transactions, brokerage may range between 2% to 4%
                  depending on transaction complexity, location, and deal size.
                </li>
              </ul>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
                All brokerage charges mentioned are exclusive of applicable
                taxes (e.g., GST).
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              3. Taxes and Other Charges
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              All prices displayed:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Are exclusive of applicable taxes unless otherwise specified.
              </li>
              <li>
                Statutory taxes (GST/VAT) will be levied as per applicable laws.
              </li>
              <li>
                Clients are responsible for paying third-party charges such as
                stamp duty, registration fees, government charges, loan
                processing fees, etc.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              4. Currency and Payment
            </h2>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                India operations: Pricing is quoted in Indian Rupees (INR).
              </li>
              <li>
                UAE operations: Pricing is quoted in United Arab Emirates Dirham
                (AED).
              </li>
              <li>
                For international clients, currency will be specified on a
                case-by-case basis.
              </li>
              <li>
                Payments must be made in the currency specified in the invoice
                or agreement.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              5. Price Changes
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We reserve the right to revise pricing at any time without prior
              notice, except where services are already contracted. Updated
              prices will be reflected on our Website and in direct client
              communications.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              6. Promotions and Discounts
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Promotional pricing, limited-time offers, and bundled service
              discounts may be provided. Promotions are subject to specific
              eligibility terms and cannot be combined unless stated explicitly.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              7. Deposits and Advance Payments
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Certain services may require advance payments or booking deposits.
              Advance payment terms, if any, will be clearly outlined at the
              time of service engagement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              8. Invoicing and Payment Schedule
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Formal invoices will be issued detailing the services rendered,
              applicable charges, and taxes. Payment due dates and methods will
              be communicated clearly through the invoice or service agreement.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              9. Default in Payment
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Non-payment may result in service suspension or termination.
              Interest charges or penalties on overdue amounts may apply
              according to law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              10. Third-Party Fees
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Third-party payments such as builder booking amounts, loan
              processing fees, property registration charges, and insurance
              premiums are separate from Prop Metaverse’s service charges.
              Clients must pay these directly to the respective third parties.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              11. No Guarantee of Results or Investments
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Service fees are for professional advice, facilitation, and
              brokerage expertise. We do not guarantee specific returns, price
              appreciation, or outcomes related to property investments or
              purchases. Clients are advised to undertake independent financial
              and legal advice before investing.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              12. Refunds
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Refunds are governed by our{" "}
              <a
                href="/cancellation-and-refund-policy"
                className="text-logoColor hover:underline"
              >
                Cancellation and Refund Policy
              </a>
              . Please refer to it for detailed terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              13. Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              For any questions related to pricing, please contact:
            </p>
            <div className="mt-4 text-sm md:text-base text-gray-600 leading-relaxed">
              <p className="font-semibold">Prop Metaverse Private Limited</p>
              <p>
                Email:{" "}
                <a
                  href="mailto:enquiry@propmetaverse.com"
                  className="text-logoColor hover:underline"
                >
                  enquiry@propmetaverse.com
                </a>
              </p>
              <p>Phone: +91 8055098000</p>
              <p>
                Website:{" "}
                <a
                  href="https://propmetaverse.com"
                  className="text-logoColor hover:underline"
                >
                  https://propmetaverse.com
                </a>
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default PricingPolicy;
