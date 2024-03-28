import { Route, Routes as RRDRoutes, Navigate } from "react-router-dom";
import * as Pg from "../pages";
import PublicRoutes from "./PublicRoute";
import { PrivateRoutes } from "./PrivateRoute";

export function Routes() {
  return (
    <RRDRoutes>
      <Route path="/" element={<PublicRoutes />}>
        <Route path="/" element={<Navigate replace to="/login" />} />
        <Route path="/login" element={<Pg.Login />} />
        <Route path="/cadastro" element={<Pg.Register />} />
      </Route>
      <Route path="/mais-pedidos" element={<Pg.MostOrderedFlavors />} />
      <Route path="/cardapio" element={<Pg.Menu />} />
      <Route path="/" element={<PrivateRoutes />}>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route path="/home" element={<Pg.Home />} />
        <Route path="/fazer-pedido" element={<Pg.PlaceOrder />} />
        <Route path="/carrinho" element={<Pg.Cart />} />
        <Route path="/pedidos" element={<Pg.MyOrders />} />
        <Route path="/mais-pedidos" element={<Pg.MostOrderedFlavors />} />
        <Route path="/cardapio" element={<Pg.Menu />} />
      </Route>
    </RRDRoutes>
  );
}
