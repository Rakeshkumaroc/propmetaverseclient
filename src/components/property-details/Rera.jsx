import { Link } from "react-router-dom";
const baseUrl = import.meta.env.VITE_APP_URL;

const Rera = ({ reraImg }) => {
  return (
    <div className="w-full mt-10 px-4 md:px-8">
      <h3 className="text-2xl font-semibold mb-4">Rera</h3>
      <div className="flex flex-wrap items-center gap-5">
        {reraImg.map(({ img, no }, index) => {
          return (
            <div
              key={index}
              className="md:p-2 p-1 sm:min-w-32  min-w-24  text-center border   rounded  "
            >
              {img ? (
                <img
                  src={baseUrl + "/Uploads/rera/" + img}
                  alt="...."
                  className=" w-32"
                />
              ) : null}
              {no ? (
                <div className="mt-1 text-gray-800">
                  <p className="   text-gray-700 leading-relaxed text-sm md:text-base" >{no}</p>
                </div>
              ) : null}
            </div>
          );
        })}
      </div>
      <p className="text-sm mt-2 text-gray-700 leading-relaxed">
        The project is registered with MahaRERA available at website{" "}
        <Link
          className="text-logoYellow underline"
          to={"https://maharera.mahaonline.gov.in"}
          target="_blank"
        >
          {" "}
          https://maharera.mahaonline.gov.in/
        </Link>
      </p>
    </div>
  );
};

export default Rera;
