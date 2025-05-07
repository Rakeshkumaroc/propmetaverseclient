import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaInstagram } from 'react-icons/fa';

const ContactInfo = () => {
  return (
    <div className="w-full bg-logoBlue/5 p-8 rounded">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Contact Information
      </h2>

      <ul className="space-y-6 text-gray-600">
        <li className="flex items-start">
          <FaMapMarkerAlt className="text-logoBlue mr-3 mt-1" />
          <div>
            <strong className="font-medium">Address:</strong>
            <p>
              India: G1 & G2, SRK Solus, Marunji, Pune – 411057.<br /><br />
              Dubai: (No specific address given)
            </p>
          </div>
        </li>

        <li className="flex items-start">
          <FaPhone className="text-logoBlue mr-3 mt-1" />
          <div>
            <strong className="font-medium">Contact:</strong>
            <p>
              India: +91 8055098000<br />
              Dubai: +971 543312433 / +971 505547292
            </p>
          </div>
        </li>

        <li className="flex items-start">
          <FaEnvelope className="text-logoBlue mr-3 mt-1" />
          <div>
            <strong className="font-medium">Email:</strong>
            <p>
              <a href="mailto:enquiry@propmetaverse.com" className="text-logoBlue hover:underline">
                enquiry@propmetaverse.com
              </a> (India Enquiries)<br />
              <a href="mailto:letstalk@propmetaverse.com" className="text-logoBlue hover:underline">
                letstalk@propmetaverse.com
              </a> (Sales India)<br />
              <a href="mailto:compliance@propmetaverse.com" className="text-logoBlue hover:underline">
                compliance@propmetaverse.com
              </a> (Grievances India)<br /><br />
              <a href="mailto:enquiry@propmetaverse.ae" className="text-logoBlue hover:underline">
                enquiry@propmetaverse.ae
              </a> (Dubai Enquiries)
            </p>
          </div>
        </li>

        <li className="flex items-start">
          <FaInstagram className="text-logoBlue mr-3 mt-1" />
          <div>
            <strong className="font-medium">Follow Us:</strong>
            <p>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-logoBlue hover:underline"
              >
                @propmetaverse
              </a>
            </p>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ContactInfo;
