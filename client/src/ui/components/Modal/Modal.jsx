
/** modal reutilizable */
export const Modal = ({ id,buttonName, title, children }) => {
  return (
    <>
      {/* Button trigger modal */}
      <button type="button" className="btn btn-dark" data-bs-toggle="modal" data-bs-target={`#${id}`}>
        {buttonName}
      </button>

      {/* Modal */}
      <div className="modal fade" id={id} data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby={`${id}Label`} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id={`${id}Label`}>{title}</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              {children}
            </div>
           
          </div>
        </div>
      </div>
    </>
  );
};

