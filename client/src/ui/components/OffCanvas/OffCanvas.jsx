import React from 'react';

export const Offcanvas = ({ id,buttonName, title, children }) => {
  return (
    <>
      {/* Button to trigger the offcanvas */}
      <button className="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target={`#${id}`} aria-controls={id}>
        {buttonName}
      </button>

      {/* Offcanvas */}
      <div className="offcanvas offcanvas-end" style={{ width: '40%' }} tabIndex="-1" id={id} aria-labelledby={`${id}Label`}>
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id={`${id}Label`}>{title}</h5>
          <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          {children}
        </div>
      </div>
    </>
  );
};

