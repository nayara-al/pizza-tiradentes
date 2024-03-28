/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import api from "../../services/api";
import { IOrder } from "../../interfaces/IOrder";
import { useAuth } from "../../hook/auth";
import { formatBrazilianDate } from "../../format/dateFormat";
import style from "./MyOrders.module.css";

function calculateTotal(order: IOrder) {
  let total = 0;
  order.pizzas.forEach((pizza) => (total += pizza.preco));
  order.bebidas.forEach((bebida) => (total += bebida.preco));
  return total.toFixed(2);
}

export default function MyOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get(`/pedidos?userId=${user!.id}`);
        setOrders(
          response.data.map((order: IOrder) => ({
            ...order,
            data: formatBrazilianDate(order.data),
          }))
        );
      } catch (error) {
        console.error("Erro ao buscar pedidos:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={style.container}>
      <h1>Meus Pedidos</h1>
      {orders.map((order) => (
        <div className={style.pedido} key={order.id}>
          <p className={style.item}>
            <span className={style.campo}>Data do Pedido: </span>
            {order.data}
          </p>
          <p className={style.item}>
            <span className={style.campo}>Total: </span>R${calculateTotal(order)}
          </p>
        </div>
      ))}
    </div>
  );
}
