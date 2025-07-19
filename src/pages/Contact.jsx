import ContactForm from "../components/home/ContactForm";
import Header from "../components/contact/Header";
import Footer from "../components/global/Footer";
import Navbar from "../components/global/Navbar";
import OfficeCard from "../components/contact/OfficeCard";
import ExploreWorld from "../components/contact/ExploreWorld";
import RealEstateBanner from "../components/global/RealEstateBanner";

const Contact = () => {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white">
      <Navbar />
      <Header title="Get in Touch with Propmetaverse" para="Welcome to Propmetaverse Contact Us page. We’re here to assist you with any inquiries, requests, or feedback you may have. Whether you’re looking to buy or sell a property, explore investment opportunities, or simply want to connect, we’re just a message away. Reach out to us, and let’s start a conversation."
       />
      <main>
        <section>
          <div>
            <ContactForm />
          </div>
        </section>

        <section className="w-full md:py-20 px-4 sm:px-6 md:px-75 mx-auto max-w-[1920px] mb-[93px]">
          <div>
            <h2 className="text-[28px] md:text-[48px] font-semibold text-logoBlue mb-5 leading-tight">
              Discover Our Office Locations
            </h2>
            <p className="mb-10 text-[18px] md:text[24px]">
              Propmetaverse is here to serve you across multiple locations. Whether you're looking to meet our team, discuss real estate opportunities, or simply drop by for a chat, we have offices conveniently located to serve your needs. Explore the categories below to find the Propmetaverse office nearest to you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <OfficeCard
              type="Main Headquarters"
              address="123 Propmetaverse Plaza, City Center, Metropolis"
              description="Our main headquarters serve as the heart of Propmetaverse. Located in the bustling city center, this is where our core team of experts operates, driving the excellence and innovation that define us."
              email="info@estatein.com"
              phone="+1 (123) 456-7890"
              city="Metropolis"
            />

            <OfficeCard
              type="Regional Offices"
              address="456 Urban Avenue, Downtown District, Metropolis"
              description="Propmetaverse presence extends to multiple regions, each with its own dynamic real estate landscape. Discover our regional offices, staffed by local experts who understand the nuances of their respective markets."
              email="info@restatein.com"
              phone="+1 (123) 628-7890"
              city="Metropolis"
            />
          </div>
        </section>

        {/* ✅ Apply same padding here */}
        <section className="w-full px-4 sm:px-6 md:px-75 mx-auto max-w-[1920px]">
          <ExploreWorld />
        </section>

        <section className="w-full  mx-auto max-w-[1920px] mt-[200px]">
          <RealEstateBanner />
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
