import style from "./Footer.module.css";

export const Footer = () => {
  return (
    <>
        <footer className={`${style.footer}`}>
          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <h5>About</h5>
                <p>
                Discover a range of culinary delights. From classic dishes to innovative creations, find your next favorite flavor with us at our food store.
                </p>
              </div>
              <div className="col-md-4">
                <h5>Quick Links</h5>
                <ul>
                  <li>
                    <a href="#">Home</a>
                  </li>
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Services</a>
                  </li>
                  <li>
                    <a href="#">Contact</a>
                  </li>
                </ul>
              </div>
              <div className="col-md-4">
                <h5>Contact Us</h5>
                <p>123 Street, City, Country</p>
                <p>Email: example@example.com</p>
                <p>Phone: +123 456 789</p>
              </div>
            </div>
          </div>
        </footer>
          <div className={style.AllRigth}>
            <span>All rights Reserved</span>
          </div>
    </>
  );
};
