import HeroForm from "../hero/HeroForm.jsx";

const AddHero = ({ action }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-y-auto text-gray-800 sm:mx-8 px-4 md:px-6 2xl:mx-16 mt-6 md:mt-36 w-full">
      <div className="flex items-center flex-wrap gap-6 justify-between py-6">
        <div className="space-y-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            {action ? "Edit Hero" : "Add Hero"}
          </h1>
          <p className="text-base text-gray-600">
            We are glad to see you again!
          </p>
        </div>
      </div>
      <HeroForm action={action} />
    </div>
  );
};

export default AddHero;