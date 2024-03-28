import { IDrink, IPizza } from "./cardapio";

export interface IOrder {
  id: string;
  data: string;
  userId: string;
  pizzas: IPizza[];
  bebidas: IDrink[];
}
