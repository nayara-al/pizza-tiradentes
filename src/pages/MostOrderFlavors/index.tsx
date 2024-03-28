import { useState, useEffect } from "react";
import api from "../../services/api";
import style from "./MostOrderedFlavors.module.css";

export default function MostOrderedFlavors() {
  const [mostOrderedFlavors, setMostOrderedFlavors] = useState<{
    pizzas: string[];
    bebidas: string[];
  }>({ pizzas: [], bebidas: [] });

  useEffect(() => {
    async function fetchMostOrderedFlavors() {
      try {
        const response = await api.get("/mais-pedidos");
        setMostOrderedFlavors(response.data);
      } catch (error) {
        console.error("Erro ao obter os sabores mais pedidos:", error);
      }
    }

    fetchMostOrderedFlavors();
  }, []);

  return (
    <div className={style.container}>
      <div className={style.pedido}>
        <h2>Sabores mais pedidos</h2>
        <div className={style.pizza}>
          <h3 className={style.title}>Pizzas</h3>
          <ul className={style.list}>
            {mostOrderedFlavors.pizzas.map((pizza, index) => (
              <li className={style.item} key={index}>
                {`${index + 1} - `}
                {pizza}
              </li>
            ))}
          </ul>
        </div>
        <div className={style.bebida}>
          <h3 className={style.title}>Bebidas</h3>
          <ul className={style.list}>
            {mostOrderedFlavors.bebidas.map((bebida, index) => (
              <li key={index}>
                {`${index + 1} - `}
                {bebida}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
