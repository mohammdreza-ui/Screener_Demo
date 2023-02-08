import { FC } from "react";
import { useRoutes } from "react-router-dom";
import { routes } from "router";

const RouteHandler: FC = () => {
  const routing = useRoutes(routes());
  return routing;
};

export default RouteHandler;
