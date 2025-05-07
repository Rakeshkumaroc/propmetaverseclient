import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";

const TermsAndCondition = () => {
  return (
    <div>
      <Navbar />
      <main className="py-16 px-3 md:px-10 lg:px-20 xl:px-28 2xl:px-40 bg-white md:mt-24 mt-5">
        <div className="max-w-4xl mx-auto text-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold text-logoBlue text-center mb-6">
            Terms and Conditions
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
              . These Terms and Conditions
              ("Terms") govern your access to and use of our website{" "}
              <a
                href="https://propmetaverse.com"
                className="text-logoColor hover:underline"
              >
             https://propmetaverse.com
              </a>{" "}
              .
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              By accessing, browsing, or using our Website, you acknowledge that
              you have read, understood, and agree to be bound by these Terms.
              If you do not agree with any part of these Terms, please do not
              use the Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              1. Eligibility
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You must be at least 18 years old or have legal capacity under
              applicable law to use this Website. By using the Website, you
              represent and warrant that you meet all eligibility requirements.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              2. Use of the Website
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You agree to use the Website only for lawful purposes and in a
              manner consistent with all applicable local, national, and
              international laws and regulations. You agree not to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Use the Website in any way that violates applicable laws or
                regulations
              </li>
              <li>
                Interfere with or disrupt the operation of the Website or
                servers
              </li>
              <li>
                Use automated systems (e.g., bots, spiders) to access, scrape,
                or copy any part of the Website
              </li>
              <li>Transmit any viruses, malware, or harmful code</li>
              <li>
                Attempt unauthorized access to any portion of the Website or
                related systems
              </li>
              <li>Use the Website for fraudulent or misleading purposes</li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              We reserve the right to terminate or restrict your access if you
              engage in any prohibited conduct.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              3. Intellectual Property Rights
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              All content on this Website—including text, graphics, images,
              logos, icons, software, and other material ("Content")—is owned or
              licensed by Prop Metaverse and protected under applicable
              intellectual property laws.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              You may view, download, or print portions of the Website for your
              personal, non-commercial use only. You may not modify, reproduce,
              distribute, transmit, publicly display, publish, or create
              derivative works from any Content without our prior written
              consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              4. Property Listings and Information
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              The property listings, descriptions, photographs, floor plans,
              prices, offers, and other information presented on the Website are
              provided for general informational purposes only.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              While we strive for accuracy, we do not guarantee that all
              information is complete, current, or error-free. All real estate
              transactions are subject to final verification, independent due
              diligence, legal review, and the terms of separate agreements
              signed between the parties.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              We do not offer guarantees or warranties regarding property
              investments, returns, future values, or other real estate market
              outcomes.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              5. Third-Party Links
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Our Website may contain links to third-party websites or services
              ("Third-Party Sites"). Prop Metaverse is not responsible for the
              content, policies, or practices of any Third-Party Sites.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              Your use of any Third-Party Site is at your own risk, and we
              encourage you to review the terms and privacy policies of any
              Third-Party Sites you visit.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              6. Disclaimer of Warranties
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              The Website and its Content are provided on an "as-is" and
              "as-available" basis without warranties of any kind, express or
              implied. We do not warrant:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                That the Website will be uninterrupted, timely, secure, or
                error-free
              </li>
              <li>
                The accuracy, reliability, or completeness of any content or
                information
              </li>
              <li>
                That the Website or its servers are free of viruses or harmful
                components
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              You use the Website at your own risk.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              7. Limitation of Liability
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              To the fullest extent permitted by applicable law, Prop Metaverse,
              its directors, officers, employees, affiliates, agents, and
              licensors shall not be liable for any indirect, incidental,
              consequential, special, punitive, or exemplary damages arising out
              of or related to your use or inability to use the Website.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              This includes, but is not limited to, damages for lost profits,
              data loss, goodwill, or business interruption—even if we have been
              advised of the possibility of such damages.
            </p>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              Our total liability for any claim arising from or related to the
              Website shall not exceed the amount you have paid (if any) to
              access the Website.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              8. Indemnification
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              You agree to defend, indemnify, and hold harmless Prop Metaverse
              and its affiliates, officers, directors, employees, and agents
              from and against any claims, damages, liabilities, losses, costs,
              or expenses (including reasonable attorney’s fees) arising from
              your use of the Website, violation of these Terms, or infringement
              of any intellectual property or other right of any person or
              entity.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              9. Privacy Policy
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              Your use of the Website is also governed by our{" "}
              <a
                href="/privacy-policy"
                className="text-logoColor hover:underline"
              >
                Privacy Policy
              </a>
              , which explains how we collect, use, and protect your
              information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              10. Modifications to the Website and Terms
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We reserve the right to:
            </p>
            <ul className="list-disc pl-6 mt-2 text-sm md:text-base text-gray-600 leading-relaxed">
              <li>
                Modify, suspend, or discontinue the Website or any portion
                thereof at any time without notice.
              </li>
              <li>
                Update these Terms at any time. Updates will be effective when
                posted on this page.
              </li>
            </ul>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed mt-4">
              Your continued use of the Website following changes to the Terms
              constitutes your acceptance of the updated Terms. We encourage you
              to review this page periodically.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              11. Termination
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              We reserve the right, in our sole discretion, to terminate or
              suspend your access to all or part of the Website at any time,
              with or without notice, for any reason, including breach of these
              Terms.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              12. Governing Law and Jurisdiction
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              These Terms are governed by and construed in accordance with the
              laws of India, without regard to conflict of law principles. Any
              disputes arising under or relating to these Terms shall be subject
              to the exclusive jurisdiction of the courts located in Pune,
              Maharashtra, India.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl md:text-2xl font-semibold text-logoBlue mb-4">
              13. Contact Us
            </h2>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed">
              If you have any questions about these Terms, please contact us at:
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

export default TermsAndCondition;
