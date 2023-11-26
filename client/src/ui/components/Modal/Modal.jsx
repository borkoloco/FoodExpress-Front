import React from "react";

/** Modal reutilizable  */

export const Modal = ({name,component,title,style}) => {
  return (
    <>
      <button
        type="button"
        className={`btn ${style}`}
        data-bs-toggle="modal"
        data-bs-target={`#${name}Modal`}
        data-bs-whatever="@getbootstrap"
      >
        {name}
      </button>

      <div
        className="modal fade"
        id={`${name}Modal`}
        tabindex="-1"
        aria-labelledby={`${name}ModalLabel`}
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${name}ModalLabel`}>
                {title}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              {component}

            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Send message
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
