import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const Privacy = () => {
  return (
    <div>
      <Navbar />

      <main className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 md:mt-24 mt-5 bg-white">
        <div className="max-w-4xl mx-auto text-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold text-logoBlue text-center mb-6">
            Privacy Policy
          </h1>
          <p className="text-sm md:text-base text-gray-600 text-center mb-8">
            Effective Date: April 28, 2025
          </p>

          <section className="mb-10">
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Welcome to{" "}
              <span className="font-semibold text-logoBlue">
                Prop Metaverse Private Limited
              </span>{" "}
              . Your privacy is important
              to us. This Privacy Policy explains how we collect, use, disclose,
              and protect your information when you visit our website{" "}
              <a
                href="https://propmetaverse.com"
                className="text-logoColor hover:underline"
              >
               https://propmetaverse.com
              </a>{" "}
               and interact with our services.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              By accessing or using our Website, you agree to this Privacy
              Policy. If you do not agree, please do not use the Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              1. Information We Collect
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We may collect the following types of information:
            </p>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                a) Personal Information
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                When you interact with our Website, submit inquiries, register,
                or transact with us, we may collect personal information such
                as:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>Full Name</li>
                <li>Email Address</li>
                <li>Phone Number</li>
                <li>Postal Address</li>
                <li>Company Name</li>
                <li>Property Preferences</li>
                <li>
                  Financial Information (only when necessary for transactions)
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                b) Non-Personal Information
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We automatically collect certain non-personal information,
                including:
              </p>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>IP Address</li>
                <li>Browser type and version</li>
                <li>Device information</li>
                <li>Pages visited, time spent, and links clicked</li>
                <li>Geographic location (city, country)</li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                c) Cookies and Tracking Technologies
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                We use Cookies, Web Beacons, and similar tracking technologies
                to collect information about your interaction with our Website
                to improve user experience and service offerings.
                
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We use the collected information to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>Respond to your inquiries and requests</li>
              <li>
                Facilitate property searches, brokering, investments, and
                transactions
              </li>
              <li>
                Send you marketing and promotional communications (where
                permitted by law)
              </li>
              <li>Improve our Website, services, and customer experience</li>
              <li>
                Maintain security, detect fraud, and prevent unauthorized
                activities
              </li>
              <li>Comply with legal obligations and enforce our terms</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              3. Cookies Policy
            </h2>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                What Are Cookies?
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                Cookies are small text files stored on your device when you
                visit a website. They help the site remember your preferences
                and activities for a better browsing experience.
              </p>
            </div>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                How We Use Cookies
              </h3>
              <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
                <li>
                  Essential Cookies: To enable core functionality like security
                  and network management.
                </li>
                <li>
                  Performance and Analytics Cookies: To understand how users
                  interact with the Website and improve functionality.
                </li>
                <li>
                  Advertising and Targeting Cookies: To deliver relevant
                  advertisements and measure ad campaign effectiveness.
                </li>
              </ul>
            </div>
            <div className="mt-4">
              <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-2">
                Managing Cookies
              </h3>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                You can control or delete cookies through your browser settings.
                However, disabling certain cookies may affect the functionality
                of our Website. For more information about cookies, visit{" "}
                <a
                  href="https://www.allaboutcookies.org"
                  className="text-logoColor hover:underline"
                >
                  www.allaboutcookies.org
                </a>
                .
              </p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              4. Sharing Your Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We may share your information in limited circumstances:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                With trusted service providers who assist us in delivering our
                services (e.g., hosting, marketing, analytics)
              </li>
              <li>
                With business partners (e.g., banks, insurance providers) when
                you opt for additional services
              </li>
              <li>
                When required by law, regulation, legal process, or governmental
                request
              </li>
              <li>
                To protect our rights, property, or the safety of Prop
                Metaverse, our clients, or others
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              We do not sell, rent, or trade your personal information to third
              parties for their marketing purposes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              5. Data Retention
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We retain your information only for as long as necessary:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>To fulfill the purposes outlined in this policy</li>
              <li>
                To comply with legal, regulatory, accounting, or reporting
                obligations
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              Upon request, we will delete or anonymize your personal
              information unless required to retain it by law.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              6. Data Security
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We implement reasonable technical and organizational measures to
              protect your information from unauthorized access, disclosure,
              alteration, or destruction. However, no online transmission or
              storage system is 100% secure. We encourage you to take steps to
              protect your own data (such as maintaining secure passwords).
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              7. Your Rights
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Depending on applicable laws, you may have the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>Access, correct, or delete your personal data</li>
              <li>Object to processing or restrict processing</li>
              <li>
                Withdraw your consent (where processing is based on consent)
              </li>
              <li>Request data portability</li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:info@propmetaverse.com"
                className="text-logoColor hover:underline"
              >
                info@propmetaverse.com
              </a>
              .
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              8. Third-Party Websites
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our Website may contain links to third-party websites or services.
              This Privacy Policy does not apply to those websites. We encourage
              you to review the privacy policies of those third parties before
              interacting with them.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              If you are accessing our Website from outside India or the UAE,
              please note that your information may be transferred to, stored,
              and processed in India, the UAE, or other jurisdictions. By using
              our Website, you consent to this transfer.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We may update this Privacy Policy periodically to reflect changes
              in our practices, technologies, or legal requirements. We
              encourage you to review this page periodically. Any changes will
              be posted here, and if significant, we will notify you via email
              or a prominent notice on our Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              11. Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              If you have any questions, concerns, or complaints regarding this
              Privacy Policy or our data practices, please contact:
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
    </div>
  );
};

export default Privacy;
