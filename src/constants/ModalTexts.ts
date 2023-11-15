import { IModalText } from "../interfaces/ModalTexts.interfaces";

export const MODAL_TEXTS: {
  validZipCode: IModalText;
  invalidZipCode: IModalText;
} = {
  validZipCode: {
    title: "Adress updated",
    subTitle: "New adress added to your account",
    content:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quibusdam deleniti, dolores impedit optio blanditiis sit delectus. Quidem corporis, odio quas sint tempore placeat dolor eos dolorum? Numquam quis ab dolorum.",
    callToAction: "Nisi ut aliquip ex ea commodo consequat.",
    btnText: "UNDESTOOD",
  },
  invalidZipCode: {
    title: "Out of Delivery Area",
    subTitle: "Wherever I go, there I am.",
    content:
      "Sadly, this quote is not true for us. In other words, we are not operating in your area (yet), but things change everyday.",
    callToAction: "Sing up to our newsletter to get notified.",
    btnText: "UNDESTOOD",
  },
};
