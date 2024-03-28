import { useEffect, useState } from "react";
import api from "../../../services/api";
import style from "./PizzaForm.module.css";
import { IPizza } from "../../../interfaces/cardapio";

export default function PizzaForm() {
  const [tamanho, setTamanho] = useState<string>("");
  const [sabores, setSabores] = useState<string[]>([]);
  const [pizzas, setPizzas] = useState<IPizza[]>([]);

  useEffect(() => {
    const fetchPizzas = async () => {
      try {
        const response = await api.get<IPizza[]>("/pizzas");
        setPizzas(response.data);
      } catch (error) {
        console.error("Erro ao buscar pizzas:", error);
      }
    };

    fetchPizzas();
  }, []);

  const handleTamanhoChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTamanho(event.target.value);
  };

  const handleSaborChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const sabor = event.target.value;
    const pizzaSelecionada = pizzas.find((pizza) => pizza.nome === sabor);
    if (pizzaSelecionada && (sabores.length < 2 || tamanho === "pequena")) {
      setSabores([...sabores, sabor]);
    }
  };

  const handleAddToCart = () => {
    if (tamanho && sabores.length > 0) {
      let precoTotal = 0;

      const pizzaSelecionada = pizzas.find(
        (pizza) => pizza.nome === sabores[0]
      );

      if (pizzaSelecionada) {
        precoTotal += pizzaSelecionada.preco;

        if (tamanho === "grande") {
          if (sabores.length === 1) {
            precoTotal *= 2;
          } else {
            precoTotal +=
              pizzas.find((pizza) => pizza.nome === sabores[1])?.preco || 0;
          }
        }
      }

      const carrinho = localStorage.getItem("@PizzaTiradentes:carrinho-pizza");
      let novoCarrinho: {
        tamanho: string;
        sabores: string[];
        preco: number;
      }[] = [];

      if (carrinho) {
        novoCarrinho = JSON.parse(carrinho);
      }

      novoCarrinho.push({ tamanho, sabores, preco: precoTotal });

      localStorage.setItem(
        "@PizzaTiradentes:carrinho-pizza",
        JSON.stringify(novoCarrinho)
      );

      setTamanho("");
      setSabores([]);
    }
  };

  return (
    <>
      <div>
        <label>Tamanho:</label>
        <select
          value={tamanho}
          onChange={handleTamanhoChange}
          className={style.select}
        >
          <option className={style.option} value="">
            Selecione o tamanho
          </option>
          <option className={style.option} value="pequena">
            Pequena
          </option>
          <option className={style.option} value="grande">
            Grande
          </option>
        </select>
      </div>
      <div>
        <label>Sabores:</label>
        <select
          onChange={handleSaborChange}
          disabled={!tamanho}
          className={style.select}
        >
          <option className={style.option} value="">
            Selecione um sabor
          </option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.nome}>
              {pizza.nome} - R${pizza.preco.toFixed(2)}
            </option>
          ))}
        </select>
        <select
          onChange={handleSaborChange}
          disabled={!tamanho || tamanho === "pequena"}
          className={style.select}
        >
          <option className={style.option} value="">
            Selecione um segundo sabor (opcional)
          </option>
          {pizzas.map((pizza) => (
            <option key={pizza.id} value={pizza.nome}>
              {pizza.nome} - R${pizza.preco.toFixed(2)}
            </option>
          ))}
        </select>
      </div>
      <button
        onClick={handleAddToCart}
        disabled={!tamanho || sabores.length === 0}
        className={
          !tamanho || sabores.length === 0 ? style["btn-disable"] : style.btn
        }
      >
        Adicionar ao Carrinho
      </button>
    </>
  );
}
