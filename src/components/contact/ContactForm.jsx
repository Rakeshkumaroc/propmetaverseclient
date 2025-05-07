import React from "react";

const ContactForm = () => {
  return (
    <div className="w-full py-8">
      <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">
        Get in Touch
      </h2>
      <p className="text-gray-600 mb-8 max-w-2xl">
        Discover luxury and exclusive listings tailored for international clients with our premier real estate services.
      </p>

      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <input
            type="text"
            placeholder="Full Name"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoBlue"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoBlue"
          />
          <input
            type="text"
            placeholder="Your Address"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoBlue"
          />
          <input
            type="tel"
            placeholder="Your Phone"
            className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoBlue"
          />
        </div>

        <input
          type="text"
          placeholder="Subject"
          className="border border-gray-300 p-3 rounded w-full focus:outline-none focus:ring-2 focus:ring-logoBlue"
        />

        <textarea
          placeholder="Your Message"
          className="border border-gray-300 p-3 rounded w-full h-32 resize-none focus:outline-none focus:ring-2 focus:ring-logoBlue"
        ></textarea>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <label className="flex items-center text-gray-600">
            <input
              type="checkbox"
              className="h-4 w-4 accent-logoBlue mr-2"
            />
            <span className="text-sm">I'm not a robot</span>
          </label>
          <button
            type="submit"
            className="bg-logoColor hover:bg-logoColor/90 text-white px-8 py-3 rounded font-medium transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
