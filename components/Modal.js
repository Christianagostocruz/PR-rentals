import React, { useState } from "react";
import { urlFor } from "../lib/client";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Modal = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{props.name}</h2>
        </div>
        <div className="modal-body">
          {props.image?.map((item, i) => {
            return (
              <img
                className="modal-image"
                key={i}
                src={urlFor(item)}
              />
)})}
        </div>
        <div className="modal-footer">
          <button type="button" className="buttons" onClick={props.onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
