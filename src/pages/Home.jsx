import Navbar from "../components/global/Navbar";
import HeroSection from "../components/home/HeroSection";
import TrendingProjects from "../components/home/TrendingProjects";
import FeaturesSection from "../components/home/FeaturesSection";
import Testimonials from "../components/home/Testimonials";
import Faq from "../components/home/Faq";
import ContactForm from "../components/home/ContactForm";
import RealEstateBanner from "../components/global/RealEstateBanner";
import Footer from "../components/global/Footer";
const Home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <TrendingProjects />
      <FeaturesSection />
      <Testimonials />
      <Faq />
      <ContactForm />
      <RealEstateBanner />
      <Footer />
    </>
  );
};

export default Home;
