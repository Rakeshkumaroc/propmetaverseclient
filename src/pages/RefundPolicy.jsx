import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";

const RefundPolicy = () => {
  return (
    <>
    <Navbar />
    <main className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 md:mt-24 mt-5 bg-white">
      <div className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-3xl md:text-4xl font-bold text-logoBlue text-center mb-6">
          Cancellation and Refund Policy
        </h1>
        <p className="text-sm md:text-base text-gray-600 text-center mb-8">
          Effective Date: April 28, 2025
        </p>

        <section className="mb-10">
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            At{" "}
            <span className="font-semibold text-logoBlue">
              Prop Metaverse Private Limited
            </span>{" "}
            , client satisfaction is of
            utmost importance. However, given the nature of real estate
            consulting, brokerage, investment, and asset management services,
            certain limitations apply to cancellations and refunds.
          </p>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
            Please read this Cancellation and Refund Policy carefully before
            engaging with our services. By using our Website or availing our
            services, you agree to this Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            1. Scope of the Policy
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            This Cancellation and Refund Policy applies to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            <li>Real estate consulting services</li>
            <li>Brokering and property transaction services</li>
            <li>Investment advisory and facilitation services</li>
            <li>
              Ancillary services such as property listing, documentation
              assistance, and legal coordination
            </li>
          </ul>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
            This policy does not apply to third-party products or services (such
            as loans, insurance, or services provided by external vendors,
            developers, or builders) for which their respective policies shall
            apply.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            2. Service Engagement and Payment
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Upon engaging Prop Metaverse’s services:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            <li>
              Clients may be required to pay service fees, booking amounts,
              consultation fees, processing fees, brokerage charges, or deposits
              based on the type of service.
            </li>
            <li>
              Specific terms of engagement, including applicable fees and
              payment schedules, will be detailed in the service agreement,
              booking form, or engagement letter.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            3. Cancellation Policy
          </h2>
          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
              a) Cancellation by Client
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              <strong>Consulting Services:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                If you wish to cancel consulting services before service
                delivery has commenced, you may request cancellation by emailing{" "}
                <a
                  href="mailto:info@propmetaverse.com"
                  className="text-logoColor hover:underline"
                >
                  info@propmetaverse.com
                </a>{" "}
                within 24 hours of payment.
              </li>
              <li>
                Full or partial refunds, if any, will be processed at the sole
                discretion of Prop Metaverse after deducting administrative
                charges.
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              <strong>Brokering/Transaction Services:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                If the cancellation request is made before submission of any
                documentation to developers or before property booking, a
                partial refund may be considered after deducting service and
                administrative fees.
              </li>
              <li>
                Once a property booking has been processed or documentation
                submitted to third parties, no cancellations or refunds will be
                permitted.
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              <strong>Investment Advisory Services:</strong>
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Fees related to investment advisory, project facilitation, or
                investment consultation are non-refundable once services have
                commenced, even if the client decides not to proceed with the
                investment.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
              b) Cancellation by Prop Metaverse
            </h3>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              In rare cases where Prop Metaverse is unable to provide the
              service due to unforeseen circumstances, unavailability, or
              technical errors, we reserve the right to cancel the service. In
              such instances, a full refund or a suitable alternative service
              shall be offered at the client's option.
            </p>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            4. Refund Policy
          </h2>
          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
              a) General Conditions
            </h3>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Refunds, if approved, will be processed within 21 business days
                from the date of approval.
              </li>
              <li>
                Refunds will be made using the same payment method originally
                used by the client unless agreed otherwise.
              </li>
              <li>
                Administrative fees, taxes, government fees, and other
                third-party charges already incurred by Prop Metaverse are
                non-refundable.
              </li>
              <li>
                Partial services rendered will be deducted pro-rata from the
                refund amount.
              </li>
            </ul>
          </div>
          <div className="mt-4">
            <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
              b) Non-Refundable Situations
            </h3>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Where services have already been initiated, partially delivered,
                or fully delivered.
              </li>
              <li>
                Where cancellation is requested after the execution of
                third-party agreements (e.g., with developers, financial
                institutions, or government bodies).
              </li>
              <li>
                For any transaction-related costs such as government duties,
                registration fees, builder booking amounts, taxes, bank charges,
                or notary/legal fees paid on behalf of the client.
              </li>
              <li>
                If the cancellation is requested due to a change of mind or
                circumstances unrelated to service performance.
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            5. Booking Amounts Paid to Developers or Third Parties
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Please note:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            <li>
              Booking amounts, down payments, or deposits paid directly to
              developers/builders/third parties through Prop Metaverse’s
              facilitation are governed by their respective cancellation and
              refund policies.
            </li>
            <li>
              Prop Metaverse is not responsible for securing refunds on amounts
              paid directly to third parties.
            </li>
            <li>
              Clients are advised to carefully review the terms and conditions
              of the developer or service provider before making such payments.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            6. Special Promotions or Discounted Services
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Services availed through special promotions, discounted fees, or
            limited-time offers may have different or stricter cancellation and
            refund terms, which will be communicated separately at the time of
            booking.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            7. How to Request a Cancellation or Refund
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            All cancellation and refund requests must be submitted in writing
            to:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            <li>
              Email:{" "}
              <a
                href="mailto:info@propmetaverse.com"
                className="text-logoColor hover:underline"
              >
                info@propmetaverse.com
              </a>
            </li>
            <li>
              Subject Line: "Cancellation/Refund Request – [Your Full Name] –
              [Service Description]"
            </li>
          </ul>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
            Please include:
          </p>
          <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
            <li>Full Name</li>
            <li>Transaction/Booking ID</li>
            <li>Date of Payment</li>
            <li>Reason for Cancellation/Refund</li>
            <li>Bank details (if different from original payment method)</li>
          </ul>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
            Incomplete requests may delay processing.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            8. Disputes and Chargebacks
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            If you initiate a chargeback or dispute a payment with your bank or
            card issuer without contacting us first for resolution, we reserve
            the right to contest such disputes and provide supporting
            documentation regarding your agreement to our policies. We encourage
            all clients to contact our support team first to resolve any issues
            amicably.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            9. Changes to the Cancellation and Refund Policy
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            Prop Metaverse reserves the right to modify this Cancellation and
            Refund Policy at any time. Changes will become effective immediately
            upon being posted on the Website. You are encouraged to review this
            Policy periodically.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
            10. Contact Us
          </h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed">
            If you have any questions about this Cancellation and Refund Policy,
            please contact:
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
    <Footer/>
    </>
  );
};

export default RefundPolicy;
