import { useState } from "react"; 
import { CgClose } from "react-icons/cg";

const baseUrl = import.meta.env.VITE_APP_URL;

const Gallery = ({ galleryImg }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const openModal = (index) => {
    setCurrentSlide(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === galleryImg.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? galleryImg.length - 1 : prev - 1));
  };

  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">Gallery</h3>
      <div className="bg-white rounded gap-5 grid grid-cols-2">
        {galleryImg &&
          galleryImg
            .slice(0, 3)
            .map((value, index) => (
              <img
                key={index}
                src={baseUrl + "/Uploads/property/" + value}
                className="rounded w-full h-20 md:h-44 cursor-pointer"
                onClick={() => openModal(index)}
                alt={`Gallery image ${index + 1}`}
              />
            ))}

        {galleryImg && galleryImg[3] ? (
          <div
            className="relative rounded w-full h-20 md:h-44 cursor-pointer"
            onClick={() => openModal(3)}
          >
            <img
              src={baseUrl + "/Uploads/property/" + galleryImg[3]}
              className="rounded w-full h-full"
              alt="Gallery image 4"
            />
            <div className="bg-black/50 absolute top-0 right-0 flex justify-center items-center bottom-0 left-0 rounded">
              <p className="text-gray-200 text-2xl font-semibold">4+</p>
            </div>
          </div>
        ) : null}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-gradient-to-b from-black/90 to-gray-900/90 flex items-center justify-center z-50">
          <div className="relative bg-white rounded-xl max-w-4xl w-full mx-4 shadow-2xl border border-gray-200  ">
            <CgClose
              className="absolute top-4 right-4 bg-logoBlue/90 hover:bg-logoBlue text-white hover:text-gray-200 cursor-pointer text-xl size-8 p-1 rounded-full flex items-center justify-center transition-all duration-300 z-10"
              onClick={closeModal}
            />

            <div className="relative overflow-hidden">
              <div className="relative w-full h-[50vh] md:h-[60vh]">
                {galleryImg.map((value, index) => (
                  <img
                    key={index}
                    src={baseUrl + "/Uploads/property/" + value}
                    className={`absolute top-0 left-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out ${
                      index === currentSlide ? "opacity-100" : "opacity-0"
                    }`}
                    alt={`Slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow-md hover:scale-110 transition-all duration-300"
                onClick={prevSlide}
              >
                <svg
                  className="size-5 md:size-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1 shadow-md hover:scale-110 transition-all duration-300"
                onClick={nextSlide}
              >
                <svg
                  className="size-5 md:size-8 text-gray-700"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
                {galleryImg.map((_, index) => (
                  <button
                    key={index}
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? "bg-logoBlue scale-125"
                        : "bg-logoBlue/50 hover:bg-white/80"
                    }`}
                    onClick={() => setCurrentSlide(index)}
                  />
                ))}
              </div>

              <div className="absolute bottom-4 left-4 text-white text-sm font-medium bg-black/50 px-2 py-1 rounded">
                {currentSlide + 1} / {galleryImg.length}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
