import style from "./Header.module.css";
import Marca from "./Marca";
import Menu from "./Menu";

export default function Header() {
  return (
    <header className={style.header}>
      <Marca />
      <Menu />
    </header>
  );
}
