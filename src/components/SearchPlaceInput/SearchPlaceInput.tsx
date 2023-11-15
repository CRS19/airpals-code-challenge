import { InfoModal } from "../Modal/InfoModal";
import { useSearchPlaceInput } from "./state/useSearchPlaceInput";

export const SearchPlaceInput = () => {
  const {
    modalTexts,
    address,
    autoCompleteInfo,
    handleAddressChange,
    onClickResponse,
    openModal,
    setShowModal,
  } = useSearchPlaceInput();

  return (
    <>
      <form
        className="relative w-3/4 my-14 [&>div]:border-b [&>div]:border-airpalsGreyBackground max-w-xl"
        data-testid="form-testid"
      >
        <div className="flex bg-white p-2 focus-within:outline-none focus-within:ring-0 h-14 shadow-md">
          <img
            className="self-center mr-2 px-2 h-5 "
            src="/icons/map-pin.png"
          />{" "}
          <input
            data-testid="input-address-testid"
            className="focus:outline-none focus:ring-0 w-full"
            type="text"
            placeholder="Enter your address"
            value={address}
            onChange={handleAddressChange}
          />
        </div>
        <ul className="absolute z-10 w-full max-h-[300%] overflow-y-auto">
          {autoCompleteInfo.map((response, index) => (
            <li
              key={`${response}-${index}`}
              className="flex border-b border-airpalsGreyBackground bg-white p-2 focus-within:outline-none focus-within:ring-0 h-20 shadow-md hover:bg-gray-100 transition-colors duration-500 ease-in-out cursor-pointer active:bg-gray-200 active:opacity-50 items-center"
              onClick={() => onClickResponse(response)}
              data-testid="autocomplete-testid"
            >
              <img className=" mr-2 px-2 h-5 " src="/icons/map-pin-gray.png" />{" "}
              <div className="flex flex-col">
                <p>{response.structured_formatting.main_text}</p>
                <p className="text-sm text-airpalsGreyFont">
                  {response.structured_formatting.secondary_text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </form>
      <InfoModal
        showModal={openModal}
        setShowModal={setShowModal}
        modalTexts={modalTexts}
      />
    </>
  );
};
