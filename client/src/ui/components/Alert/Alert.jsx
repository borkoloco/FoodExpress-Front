
export const Alert = ({ show, message }) => {
    return (
      <div
        className="alert alert-light"
        role="alert"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: show ? 'block' : 'none',
          zIndex: '1000',
        }}
      >
        {message}
      </div>
    );
  };
