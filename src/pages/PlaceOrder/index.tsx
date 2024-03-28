import { useState } from "react";
import MenuItem from "../../components/OrderMenu/Menu";
import PizzaForm from "../../components/OrderMenu/PizzaForm";
import DrinksForm from "../../components/OrderMenu/DrinksForm";
import style from "./PlaceOrder.module.css"

export default function PlaceOrder() {
  const [categoriaSelecionada, setCategoriaSelecionada] =
    useState<string>("pizza");

  const handleCategoriaChange = (categoria: string) => {
    setCategoriaSelecionada(categoria);
  };

  return (
    <div className={style.container}>
      <h2>Fazer Pedido</h2>
      <MenuItem onCategoriaChange={handleCategoriaChange} />
      {categoriaSelecionada === "pizza" && (
        <PizzaForm />
      )}
      {categoriaSelecionada === "bebidas" && (
        <DrinksForm />
      )}
    </div>
  );
}
