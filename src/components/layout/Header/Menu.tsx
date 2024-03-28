import { Link, useNavigate } from "react-router-dom";
import style from "./Header.module.css";
import { USER_KEY } from "../../../constants/auth";
import { useState, useEffect } from "react";

export default function Menu() {
  const [user, setUser] = useState(localStorage.getItem(USER_KEY));
  const navigate = useNavigate();

  useEffect(() => {}, [user]);

  function signOut(): void {
    localStorage.removeItem(USER_KEY);
    setUser(null);
    navigate("/login");
  }

  return (
    <ul className={style.menu}>
      <Link to={"/cardapio"} className={style.linkMenu}>
        <li className={style.linkMenu}>Cardápio</li>
      </Link>
      <Link to={"/mais-pedidos"} className={style.linkMenu}>
        <li className={style.linkMenu}>Mais pedidos</li>
      </Link>
      {user != null ? <AuthenticatedMenu /> : <UnauthenticatedMenu />}
      {user != null ? (
        <button className={style.btn} onClick={signOut}>
          Sair
        </button>
      ) : null}
    </ul>
  );
}

function AuthenticatedMenu() {
  return (
    <>
      <li>
        <Link to={"/fazer-pedido"} className={style.linkMenu}>
          Fazer pedido
        </Link>
      </li>
      <li>
        <Link to={"/pedidos"} className={style.linkMenu}>
          Meus pedidos
        </Link>
      </li>
      <li>
        <Link to={"/carrinho"} className={style.linkMenu}>
          Carrinho
        </Link>
      </li>
    </>
  );
}

function UnauthenticatedMenu() {
  return (
    <>
      <li>
        <Link to={"/"} className={style.linkMenu}>
          Entrar
        </Link>
      </li>
      <li>
        <Link to={"/cadastro"} className={style.linkMenu}>
          Cadastrar
        </Link>
      </li>
    </>
  );
}
