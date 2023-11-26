
import icon_burguer from '../../assets/icon-burguer.svg'

export const NavBarAdmin = ({Toggle}) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-transparent">
      
      <a
        className="navbar-brand bi bi-justify-left fs-4"
        onClick={Toggle}
      >
        <img src={icon_burguer} alt="icon-burguer" />
      </a>
      <button
        className="navbar-toggler d-lg-none"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#collapsibleNavId"
        aria-controls="collapsibleNavId"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <i className="bi bi-justify"></i>
      </button>
      <div className="collapse navbar-collapse" id="collapsibleNavId">
        
        <ul className="navbar-nav ms-auto mt-2 mt-lg-0">
          
          <li className="nav-item dropdown">
            <a
              className="nav-link dropdown-toggle text-black"
              href="#"
              id="dropdownId"
              data-bs-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              Andrés
            </a>
            <div className="dropdown-menu dropdown-menu-end" aria-labelledby="dropdownId">
              
              <a className="dropdown-item" href="#">
                Profile
              </a>
              <a className="dropdown-item" href="#">
                Setting
              </a>
              <a className="dropdown-item" href="#">
                <strong>Logout</strong>
              </a>
            </div>


          </li>
        </ul>
      </div>
    </nav>
  );
}
