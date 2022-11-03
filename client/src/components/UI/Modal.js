import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";

const Modal = ({ children, closeModal, style }) => {
  const portalElement = document.getElementById("overlays");

  const modal = (
    <div className='modal' style={style}>
      <div className="content">{children}</div>
    </div>
  );

  const backdrop = <div className="backdrop" onClick={closeModal} />;

  return (
    <>
      {ReactDOM.createPortal(backdrop, portalElement)}
      {ReactDOM.createPortal(modal, portalElement)}
    </>
  );
};

export default Modal;
