
import { NavLink } from 'react-router-dom';
import style from './Alert.module.css'

export const Alert = ({ show, message }) => {
    return (
      <div
        className={`alert alert-light ${style.bgAlert}`}
        role="alert"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          display: show ? 'block' : 'none',
          zIndex: '1000',
        }}
      >
        ✔ {message}
        <NavLink to="/cart">
            <button className={`${style.btnAlert}`}>View Cart</button>
        </NavLink>
      </div>
    );
  };
