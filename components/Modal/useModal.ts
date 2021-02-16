import { useState } from "react";

export type ModalContext = "add" | "modify" | "delete" | "";

const useModal = () => {
  const [isShowing, setIsShowing] = useState(false);
  const [modalContext, setModalContext] = useState<ModalContext>("");

  const toggle = (context: ModalContext) => {
    setIsShowing(!isShowing);
    setModalContext(context);
  };

  return {
    isShowing,
    toggle,
    modalContext,
  };
};

export default useModal;
