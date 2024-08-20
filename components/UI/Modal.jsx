import { useRef } from "react";

const Modal = ({ children, isOpen, onClose }) => {
  const dialogRef = useRef(null);

  if (dialogRef.current) {
    if (isOpen) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }

  return (
    <dialog ref={dialogRef}>
      {children}
      <button onClick={onClose}>Close</button>
    </dialog>
  );
};

export default Modal;
