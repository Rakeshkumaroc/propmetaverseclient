import HeroForm from "../hero/HeroForm.jsx"

const AddHero = ({ action }) => {
  return (
    <div className="bg-gray-100 overflow-y-auto text-black sm:mx-8 px-3 2xl:mx-16 mt-5 md:mt-36 w-full">
    <div className="flex items-center mb-5 flex-wrap gap-4 justify-between">
      <div className="space-y-1">
        <p className="text-[30px] font-semibold leading-[45px]">
          {action ? "Edit Hero" : "Add Hero"}
        </p>
        <p className="text-sm leading-[25.9px]">
          We are glad to see you again!
        </p>
      </div>
    </div>
    <HeroForm action={action} />
  </div>
  )
}

export default AddHero;