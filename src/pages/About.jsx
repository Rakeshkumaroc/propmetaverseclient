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
import OurValues from "../components/about/OurValues";
import OurAchievements from "../components/about/OurAchievements";
import PropmetaverseSteps from "../components/about/PropmetaverseSteps";
import TeamSection from "../components/about/TeamSection";
import ClientsSection from "../components/about/ClientsSection";
import RealEstateBanner from "../components/global/RealEstateBanner";
const About = () => {
  return (
    <>
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <Navbar />
        <OurJourney />
        <OurValues />
        <OurAchievements />
        <PropmetaverseSteps />
        <TeamSection />
        <ClientsSection /> 

        <RealEstateBanner />
        <Footer />
      </div>
    </>
  );
};

export default About;
