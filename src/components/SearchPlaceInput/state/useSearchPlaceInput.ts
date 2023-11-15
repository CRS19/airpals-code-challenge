import { useEffect, useState } from "react";
import {
  IAddressDetail,
  IAddressDetailsResponse,
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
    useState<IAddressDetail | null>(null);
  const [autoCompleteInfo, setAutoCompleteInfo] = useState<
    IPlacesAutocomplete[]
  >([]);

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(e.target.value);
  };

  const getAutoComplete = async (address: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_PROXY_SERVER_AUTOCOMPLETE}?input=${address}&key=${
        import.meta.env.VITE_GOOGLE_API_KEY
      }`
    );
    const data: { predictions: IPlacesAutocomplete[] } = await response.json();

    setAutoCompleteInfo(data.predictions);
  };

  const getAddressDetails = async (placeId: string) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_PROXY_SERVER_DETAILS_URL
      }?place_id=${placeId}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
    );
    const data: IAddressDetailsResponse = await response.json();

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

  const validateZipCode = (selectedAddressZipCode: string) =>
    AVAILABLE_ZIP_CODES.includes(selectedAddressZipCode)
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
      getAddressDetails(selectedAddress.place_id);
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
