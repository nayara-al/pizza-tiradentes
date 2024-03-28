import { useState, useEffect } from "react";
import api from "../../services/api";
import { IDrink, IPizza } from "../../interfaces/cardapio";
import * as Component from "../../components";
import style from "./Menu.module.css";

export default function Menu() {
  const [pizzas, setPizzas] = useState<IPizza[]>([]);
  const [bebidas, setBebidas] = useState<IDrink[]>([]);
  const [categoria, setCategoria] = useState<string>("pizza"); // Estado para controlar a categoria atual

  useEffect(() => {
    async function fetchData() {
      try {
        const pizzasResponse = await api.get<IPizza[]>("/pizzas");
        const bebidasResponse = await api.get<IDrink[]>("/bebidas");

        setPizzas(pizzasResponse.data);
        setBebidas(bebidasResponse.data);
      } catch (error) {
        console.error("Erro ao obter o cardápio:", error);
      }
    }

    fetchData();
  }, []);

  const handleCategoriaChange = (categoria: string) => {
    setCategoria(categoria);
  };

  return (
    <div className={style.container}>
      <h2>Cardápio</h2>
      <Component.Menu onCategoriaChange={handleCategoriaChange} />{" "}
      <div className={style.pedido}>
        <h3 className={style.title}>
          {categoria === "pizza" ? "Pizzas*" : "Bebidas"}
        </h3>{" "}
        <ul className={style.list}>
          {categoria === "pizza"
            ? pizzas.map((pizza, index) => (
                <li key={pizza.id}>
                  <p className={style['item-title']}>{`${index+1} - `}{pizza.nome} - R$ {pizza.preco.toFixed(2)}</p>
                  <p className={style['item-descricao']}>{pizza.descricao}</p>
                </li>
              ))
            : bebidas.map((bebida, index) => (
                <li key={bebida.id}>
                  {`${index+1} - `}{bebida.nome} - R$ {bebida.preco.toFixed(2)}
                </li>
              ))}
        </ul>
      </div>
      {categoria === "pizza" && (
        <p className={style.obs}>
          *Valor informado referente a uma pizza pequena. Para o tamanho grande
          o valor dos sabores escolhidos será somado. Caso seja uma pizza
          inteira de um sabor, o valor da pizza grande será igual duas pizzas
          pequenas
        </p>
      )}
    </div>
  );
}
