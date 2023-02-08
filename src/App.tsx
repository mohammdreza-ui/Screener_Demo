import { useCallback, useState } from "react";

import { RouteHandler } from "components/route-handler";
import { CustomProvider } from "rsuite";

// css
import "rsuite/dist/rsuite.min.css";
import "./index.css";
import { Header } from "components/ui/header";

const App = () => {
  return (
    <CustomProvider theme="dark">
      <Header/>
      <RouteHandler />
    </CustomProvider>
  );
};

export default App;
