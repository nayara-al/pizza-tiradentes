import style from "./Menu.module.css"
interface MenuSelecaoProps {
  onCategoriaChange: (categoria: string) => void;
}

export default function MenuItem({ onCategoriaChange }: MenuSelecaoProps) {
  return (
    <div className={style.container}>
      <button className={style.btn} onClick={() => onCategoriaChange("pizza")}>Pizzas</button>
      <button className={style.btn} onClick={() => onCategoriaChange("bebidas")}>Bebidas</button>
    </div>
  );
}
