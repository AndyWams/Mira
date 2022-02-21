import { NavLink } from "react-router-dom";
import styles from "../styles/Header.module.scss";

function Header({ toggleClass }) {
  return (
    <header className={styles.header}>
      <h3>Mira App</h3>
      <div className="d-flex align-items-center">
        <NavLink className="navbar-brand" to="/">
          Home
        </NavLink>
        <NavLink className="navbar-brand" to="/actors/awards">
          Actors
        </NavLink>
      </div>
      <div className={styles.hambuger} onClick={toggleClass}>
        <ion-icon name="reorder-three-outline"></ion-icon>
      </div>
    </header>
  );
}

export default Header;
