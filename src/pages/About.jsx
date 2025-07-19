import React from "react";
import Navbar from "../components/global/Navbar";
import Footer from "../components/global/Footer";
import Header from "../components/contact/Header";
import ourMission from "../assets/image/our-mission.jpg";
import ourVision from "../assets/image/our-vision.jpg";
import ourTeam from "../assets/image/welcome-our-teams.jpg";
import ourHistory from "../assets/image/ourHistory.jpg";
import ourApproach from "../assets/image/ourApproach.jpg";
import OurJourney from "../components/about/OurJourney";
const About = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <OurJourney />
        <Header urlName="About Us" />

        <main className="px-4 md:px-10 lg:px-20 xl:px-28 2xl:px-40">
          <section className="py-12">
            {/* First Full Width Content */}
            <p className="text-gray-700 text-lg leading-8 mb-6">
              Welcome to Prop Metaverse Private Limited, your trusted partner in
              real estate consulting, brokering, investment, and asset
              management. Since our founding in November 2022, we have steadily
              expanded our footprint, launching Prop Metaverse Real Estate LLC
              in the UAE in 2023 to serve global investors with bespoke
              brokering and investment solutions.
            </p>

            <p className="text-gray-700 text-lg leading-8 mb-12">
              We operate through legally registered entities in both India and
              the UAE, ensuring full regulatory compliance and adhering to the
              highest standards of transparency and professionalism. With RERA
              registrations in both countries, we reaffirm our commitment to
              ethical practices, quality service, and operational excellence.
            </p>
            <p className="text-gray-700 text-lg leading-8 mb-12">
              In a remarkably short span, Prop Metaverse has earned a reputation
              as a trusted name in the competitive real estate sector. Our
              relentless pursuit of innovation, dedication to quality, and
              unwavering focus on personalized client service have set us apart.
              We curate only the finest residential, commercial, and land
              projects, ensuring that each opportunity we present meets the
              highest standards of distinction and value.
            </p>

            {/* Section 1: Content Left - Image Right */}
            <div className="flex flex-col-reverse lg:flex-row gap-10 items-center mb-16">
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Our History</h2>
                <p className="text-gray-600 leading-7">
                  Prop Metaverse was built with a vision—to be a transformative
                  force in real estate. Through deep market insights,
                  cutting-edge technology, and a client-centric approach, we
                  have achieved rapid growth, forming strategic partnerships and
                  expanding our geographic reach. Our track record is defined by
                  outstanding results and lasting relationships with our clients
                  and partners.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={ourHistory}
                  alt="Our Mission"
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            {/* Section 2: Image Left - Content Right */}
            <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
              <div className="lg:w-1/2">
                <img
                  src={ourMission}
                  alt="Our Mission"
                  className="w-full rounded-lg"
                />
              </div>
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-gray-600 leading-7">
                  To Redefine and Simplify the Real Estate Experience for
                  Everyone. Whether you're buying your first home, expanding
                  your commercial investments, exploring land opportunities, or
                  seeking sophisticated real estate ventures, Prop Metaverse
                  offers clarity, expert guidance, and confidence at every step.
                  Our processes are designed to eliminate complexity, empowering
                  clients with knowledge and assurance throughout their journey.
                </p>
              </div>
            </div>

            {/* Section 3: Content Left  - Image Right */}
            <div className="flex flex-col-reverse lg:flex-row gap-10 items-center mb-16">
              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
                <p className="text-gray-600 leading-7">
                  To Become a Leading Global Real Estate Company—Recognized for
                  Innovation, Integrity, and Excellence. We aspire to set new
                  standards for quality and client satisfaction, while building
                  a sustainable future through responsible investments,
                  community enhancement, and stakeholder empowerment.
                </p>
              </div>
              <div className="lg:w-1/2">
                <img
                  src={ourVision}
                  alt="Our Vision"
                  className="w-full rounded-lg"
                />
              </div>
            </div>

            {/* Section 4:  Image Left - Content Right */}

            <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
              <div className="lg:w-1/2">
                <img
                  src={ourApproach}
                  alt="Profit with Purpose"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Our Approach</h2>
                <p className="text-gray-600 leading-7">
                  Our approach blends global best practices with a deep
                  understanding of local markets. We embrace comprehensive
                  service offerings, digital innovation, diversity, inclusivity,
                  and sustainable growth. Our strategies are data-driven,
                  precise, and crafted for long-term success, powered by
                  advanced analytics and technological tools. Going Beyond Real
                  Estate We understand that a real estate transaction is just
                  the beginning. Through strategic alliances with leading
                  nationalized banks and top insurance providers, we offer
                  value-added services such as property financing, property
                  insurance, and flexible payment plans—ensuring a seamless,
                  secure, and rewarding experience for our clients.
                </p>
              </div>
            </div>

            {/* Section 5: No Image - Content In Full Width */}
            <div className="flex flex-col items-center text-center mb-16">
              <div className="w-full">
                <h2 className="text-2xl font-semibold mb-4">
                  Profit with Purpose & Empowerment
                </h2>
                <p className="text-gray-600 leading-7">
                  At Prop Metaverse, we believe success must go beyond profits.
                  Our commitment to 'Profit with Purpose' drives us to create
                  meaningful, lasting impacts in the communities we serve. We
                  are passionate about empowering women, fostering career growth
                  within our company and across the broader real estate sector.
                </p>
              </div>
            </div>

            {/* Section 6: Image Left - Content Right */}
            <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
              <div className="lg:w-1/2">
                <img
                  src={ourTeam}
                  alt="Our Expert Team"
                  className="w-full rounded-lg"
                />
              </div>

              <div className="lg:w-1/2">
                <h2 className="text-2xl font-semibold mb-4">Our Expert Team</h2>
                <p className="text-gray-600 leading-7">
                  At the heart of Prop Metaverse is our team of seasoned
                  professionals—experts in real estate brokering, market
                  analytics, investment strategy, and client relations.
                  Operating across five primary and one secondary market in
                  India, our team consistently delivers personalized,
                  exceptional service, helping clients make confident and
                  informed real estate decisions. At Prop Metaverse Private
                  Limited, we believe real estate should be accessible,
                  transparent, and rewarding for everyone. Welcome to a new era.
                  Welcome to Prop Metaverse.
                </p>
              </div>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default About;
