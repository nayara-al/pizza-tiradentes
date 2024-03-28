import { useState, useEffect, FormEvent } from "react";
import { IPizza, IDrink } from "../../interfaces/cardapio";
import * as Component from "../../components";
import TrashIcon from "../../assets/trash.svg";
import style from "./Cart.module.css";
import api from "../../services/api";
import { useAuth } from "../../hook/auth";

export default function Cart() {
  const { user } = useAuth();
  
  const [carrinhoPizzas, setCarrinhoPizzas] = useState<IPizza[]>([]);
  const [carrinhoBebidas, setCarrinhoBebidas] = useState<IDrink[]>([]);

  useEffect(() => {
    const carrinhoPizzasSalvo = localStorage.getItem(
      "@PizzaTiradentes:carrinho-pizza"
    );
    if (carrinhoPizzasSalvo) {
      setCarrinhoPizzas(JSON.parse(carrinhoPizzasSalvo));
    }

    const carrinhoBebidasSalvo = localStorage.getItem(
      "@PizzaTiradentes:carrinho-bebidas"
    );
    if (carrinhoBebidasSalvo) {
      setCarrinhoBebidas(JSON.parse(carrinhoBebidasSalvo));
    }
  }, []);

  const handleRemoverItemPizza = (index: number) => {
    const novoCarrinhoPizzas = [...carrinhoPizzas];
    novoCarrinhoPizzas.splice(index, 1);
    setCarrinhoPizzas(novoCarrinhoPizzas);
    localStorage.setItem(
      "@PizzaTiradentes:carrinho-pizza",
      JSON.stringify(novoCarrinhoPizzas)
    );
  };

  const handleRemoverItemBebida = (index: number) => {
    const novoCarrinhoBebidas = [...carrinhoBebidas];
    novoCarrinhoBebidas.splice(index, 1);
    setCarrinhoBebidas(novoCarrinhoBebidas);
    localStorage.setItem(
      "@PizzaTiradentes:carrinho-bebidas",
      JSON.stringify(novoCarrinhoBebidas)
    );
  };

  const totalPizzas = carrinhoPizzas.reduce(
    (acc, pizza) => acc + pizza.preco,
    0
  );
  const totalBebidas = carrinhoBebidas.reduce(
    (acc, bebida) => acc + bebida.preco,
    0
  );
  const total = totalPizzas + totalBebidas;

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ): Promise<void> {
    event.preventDefault();
    try {
      const pedido = {
        data: new Date().toISOString(),
        userId: user!.id,
        pizzas: carrinhoPizzas,
        bebidas: carrinhoBebidas,
      };
  
      await api.post("/pedidos", pedido);
  
      console.log("Pedido enviado com sucesso!");
      localStorage.removeItem("@PizzaTiradentes:carrinho-pizza");
      localStorage.removeItem("@PizzaTiradentes:carrinho-bebidas");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
    }
  }
  

  return (
    <form className={style.container} onSubmit={handleSubmit}>
      <h2>Carrinho</h2>
      <div className={style.pedido}>
        <div className={style.pizza}>
          <h3>Pizzas</h3>
          {carrinhoPizzas.map((pizza, index) => (
            <>
              <div key={index} className={style.item}>
                <p>
                  Tamanho: {pizza.tamanho} - {pizza.sabores.join(", ")} - R$
                  {pizza.preco.toFixed(2)}
                </p>
                <button
                  onClick={() => handleRemoverItemPizza(index)}
                  className={style.btn}
                >
                  <img src={TrashIcon} />
                </button>
              </div>
            </>
          ))}
        </div>
        <hr className={style.line} />
        <div className={style.bebida}>
          <h3>Bebidas</h3>
          {carrinhoBebidas.map((bebida, index) => (
            <div key={index} className={style.item}>
              <p>
                {bebida.nome} - R${bebida.preco.toFixed(2)}
              </p>
              <button
                onClick={() => handleRemoverItemBebida(index)}
                className={style.btn}
              >
                <img src={TrashIcon} />
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className={style.total}>
        <h3>Total:</h3>
        <p>R${total.toFixed(2)}</p>
      </div>
      <Component.Button type="submit">Finalizar pedido</Component.Button>
    </form>
  );
}
