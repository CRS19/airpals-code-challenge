import { IModalText } from "../../interfaces/ModalTexts.interfaces";

export interface IInfoModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  modalTexts: IModalText;
}

export const InfoModal = ({
  showModal,
  setShowModal,
  modalTexts,
}: IInfoModalProps) => {
  return (
    <>
      <div
        className={`justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none transition-opacity duration-300 ease-in-out ${
          showModal ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        data-testid="modal-testid"
        onClick={() => setShowModal(false)}
      >
        <div
          className="relative w-auto my-6 mx-auto max-w-xl"
          data-testid="modal-content-testid"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 rounded-t">
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={() => setShowModal(false)}
                data-testid="close-btn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 50 50"
                  width="25px"
                  height="25px"
                >
                  <path d="M 9.15625 6.3125 L 6.3125 9.15625 L 22.15625 25 L 6.21875 40.96875 L 9.03125 43.78125 L 25 27.84375 L 40.9375 43.78125 L 43.78125 40.9375 L 27.84375 25 L 43.6875 9.15625 L 40.84375 6.3125 L 25 22.15625 Z" />
                </svg>
              </button>
            </div>
            <div className="relative flex flex-col items-center p-6 flex-auto">
              <h3 className="text-2xl font-semibold mb-5">
                {modalTexts.title}
              </h3>
              <h3 className="text-1xl font-semibold">{modalTexts.subTitle}</h3>
              <p className="my-4 text-blueGray-500 text-md leading-relaxed text-center">
                {modalTexts.content}
              </p>
              <p className="my-4 text-blueGray-500 text-md leading-relaxed text-center">
                {modalTexts.callToAction}
              </p>
            </div>
            <div className="flex items-center justify-center p-6 mt-16 rounded-b">
              <button
                className="text-white bg-[#FF99CE] rounded-3xl w-2/4 h-12 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                data-testid="undestood-btn"
                onClick={() => setShowModal(false)}
              >
                {modalTexts.btnText}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={` opacity-0 fixed inset-0 z-40 bg-black transition-opacity duration-300 ease-in-out ${
          showModal ? "opacity-25" : "opacity-0 pointer-events-none"
        }`}
      />
    </>
  );
};
