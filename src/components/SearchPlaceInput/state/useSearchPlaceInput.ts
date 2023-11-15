import { useEffect, useState } from "react";
import {
  IAdressDetail,
  IAdressDetailsResponse,
  IPlacesAutocomplete,
} from "../../../interfaces/Places.interfaces";
import { AVAILABLE_ZIP_CODES } from "../../../constants/AvaiableZipCodes";
import { MODAL_TEXTS } from "../../../constants/ModalTexts";
import { IModalText } from "../../../interfaces/ModalTexts.interfaces";

export const useSearchPlaceInput = () => {
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null);
  const [openModal, setOpenModal] = useState(false);
  const [modalTexts, setModalTexts] = useState<IModalText>(
    MODAL_TEXTS.validZipCode
  );
  const [address, setAddress] = useState<string>("");
  const [selectedAddress, setSelectedAddress] =
    useState<IPlacesAutocomplete | null>(null);
  const [selectedAddressDetails, setSelectedAddressDetails] =
    useState<IAdressDetail | null>(null);
  const [autoCompleteInfo, setAutoCompleteInfo] = useState<
    IPlacesAutocomplete[]
  >([]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const getAutoComplete = async (address: string) => {
    console.log("GET AUTO COMPLETE CALLED");
    const response = await fetch(
      `${
        import.meta.env.VITE_GOOGLE_MAPS_AUTOCOMPLETE_URL
      }?input=${address}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    const data: { predictions: IPlacesAutocomplete[] } = await response.json();
    console.log(data);

    setAutoCompleteInfo(data.predictions);
  };

  const getAdressDetails = async (placeId: string) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_GOOGLE_MAPS_DETAILS_URL
      }?place_id=${placeId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    const data: IAdressDetailsResponse = await response.json();
    console.log("los detalles son ->", data);

    setSelectedAddressDetails(data.result);
  };

  const onClickResponse = (address: IPlacesAutocomplete) => {
    setSelectedAddress(address);
    setAddress(address.description);
  };

  const setShowModal = (showModal: boolean) => {
    if (showModal === false) {
      setSelectedAddress(null);
      setSelectedAddressDetails(null);
    }

    setOpenModal(showModal);
  };

  const validateZipCode = (selectedAdressZipCode: string) =>
    AVAILABLE_ZIP_CODES.includes(selectedAdressZipCode)
      ? MODAL_TEXTS.validZipCode
      : MODAL_TEXTS.invalidZipCode;

  useEffect(() => {
    if (timerId) {
      clearTimeout(timerId);
    }

    if (!selectedAddress) {
      setTimerId(
        setTimeout(() => {
          getAutoComplete(address);
        }, 1000)
      );
    }
  }, [address]);

  useEffect(() => {
    if (selectedAddress) {
      getAdressDetails(selectedAddress.place_id);
    }
  }, [selectedAddress]);

  useEffect(() => {
    if (selectedAddressDetails) {
      setOpenModal(true);
      setModalTexts(
        validateZipCode(
          selectedAddressDetails.address_components.find((el) =>
            el.types.includes("postal_code")
          )?.long_name || ""
        )
      );
    }
  }, [selectedAddressDetails]);

  return {
    modalTexts,
    address,
    autoCompleteInfo,
    handleAddressChange,
    onClickResponse,
    openModal,
    setShowModal,
  };
};
