const baseUrl = import.meta.env.VITE_APP_URL;

const Header = ({ galleryImg }) => {
  return (
    <div className="mx-auto py-10">
      {galleryImg.length > 2 ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Left Image */}
          <div className="overflow-hidden hidden md:block md:col-span-1">
            <img
              src={baseUrl + '/uploads/property/' + galleryImg[0]}
              alt="Lobby"
              className="w-full h-[500px] md:h-[600px] object-cover "
            />
          </div>

          {/* Center Image - span 2 cols */}
          <div className="overflow-hidden md:col-span-2">
            <img
              src={baseUrl + '/uploads/property/' + galleryImg[1]}
              alt="Tower"
              className="w-full h-[500px] md:h-[600px] object-cover "
            />
          </div>

          {/* Right Image */}
          <div className="overflow-hidden hidden md:block md:col-span-1">
            <img
              src={baseUrl + '/uploads/property/' + galleryImg[2]}
              alt="Bedroom"
              className="w-full h-[500px] md:h-[600px] object-cover "
            />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          <div className="overflow-hidden">
            <img
              src={baseUrl + '/uploads/property/' + galleryImg[0]}
              alt="Gallery"
              className="w-full h-[600px] object-cover "
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Header; 