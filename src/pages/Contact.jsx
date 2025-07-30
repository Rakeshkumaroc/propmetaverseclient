import ContactForm from "../components/home/ContactForm";
import Header from "../components/contact/Header";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar"; 
import ExploreWorld from "../components/contact/ExploreWorld";
import RealEstateBanner from "../components/global/RealEstateBanner";
import ContactCardGrid from "../components/contact/ContactCardGrid";
import DiscoverOffice from "../components/contact/DiscoverOffice";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <Header
        title="Get in Touch with Propmetaverse"
        para="Welcome to Propmetaverse Contact Us page. We’re here to assist you with any inquiries, requests, or feedback you may have. Whether you’re looking to buy or sell a property, explore investment opportunities, or simply want to connect, we’re just a message away. Reach out to us, and let’s start a conversation."
      />
      <ContactCardGrid />

      <ContactForm />
      <DiscoverOffice /> 

      <ExploreWorld />

      <RealEstateBanner />

      <Footer />
    </div>
  );
};

export default Contact;
