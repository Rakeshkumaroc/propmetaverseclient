 
import Navbar from "../components/global/Navbar";
import HeroSection from "../components/home/HeroSection";
import AgentsSection from "../components/home/AgentsSection";
import Footer from "../components/global/Footer";
import RealEstateDeals from "../components/home/RealEstateDeals"; 
import ContactUs from "../components/home/ContactUs"; 
import TrendingProjects from "../components/home/TrendingProjects";  
const Home = () => { 
  return (
    <>
      <Navbar isGlass={true}/>
      <HeroSection  />
      <TrendingProjects/>
      <RealEstateDeals /> 
      <ContactUs />
      <AgentsSection />
      <Footer />
    </>
  );
};

export default Home;