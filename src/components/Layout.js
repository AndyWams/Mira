import styles from "../styles/Main.module.scss";

function Layout({ children }) {
  return <main className={styles.main}>{children}</main>;
}

export default Layout;
