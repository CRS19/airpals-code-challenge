import { useState } from "react";
// Asegúrate de tener instalado react-icons

export const SearchPlaceInput = () => {
  const [address, setAddress] = useState<string>("");

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const responses = [
    { dir: "875 Bordeaux Way", description: "Nape CA, USA" },
    { dir: "Alcalde Pedro Alarcon 875", description: "San Miguel, Chile" },
    { dir: "875 South Bundy Drive", description: "Los Angeles, CA, USA" },
  ];

  return (
    <form className="w-3/4 my-14 [&>div]:border-b [&>div]:border-airpalsGreyBackground">
      <div className="flex bg-white p-2 focus-within:outline-none focus-within:ring-0 h-14 shadow-md">
        <img className="self-center mr-2 px-2 h-5 " src="/icons/map-pin.png" />{" "}
        <input
          className="focus:outline-none focus:ring-0"
          type="text"
          placeholder="Enter your address"
          value={address}
          onChange={handleAddressChange}
        />
      </div>
      {responses.map((response, index) => (
        <div
          key={`${response}-${index}`}
          className="flex bg-white p-2 focus-within:outline-none focus-within:ring-0 h-20 shadow-md hover:bg-gray-100 transition-colors duration-500 ease-in-out cursor-pointer active:bg-gray-200 active:opacity-50 items-center"
        >
          <img className=" mr-2 px-2 h-5 " src="/icons/map-pin-gray.png" />{" "}
          <div className="flex flex-col">
            <p>{response.dir}</p>
            <p className="text-sm text-airpalsGreyFont">
              {response.description}
            </p>
          </div>
        </div>
      ))}
    </form>
  );
};
