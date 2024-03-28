import style from "./Header.module.css"

export default function Marca() {
  return (
    <div className={style.containerMarca}>
        <img src='/logo.png' alt='logo fatia de pizza' className={style.logo}/>
        <h2 className={style.headerTitle}>Pizzaria Tiradentes</h2>
    </div>
  )
}
