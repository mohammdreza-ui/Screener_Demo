import { RouteHandler } from "components/route-handler/route-handler";
import { CustomProvider } from "rsuite";
import Cookies from 'js-cookie';

// css
import "rsuite/dist/rsuite.min.css";
import "./index.css";
import { Header } from "components/ui/header/header";
import { useCallback, useState } from "react";

const App = () => {
  const [isDark, setIsDark] = useState(Cookies.get("mode")!="light");


  const handleToggle = useCallback(() => {
    Cookies.set("mode", isDark ? "light" : "dark");
    setIsDark(!isDark);

  }, [isDark]);


  return (
    <CustomProvider theme={isDark ? "dark" : "light"}>
      <Header toggleMode={handleToggle} isDark={isDark} />
      <RouteHandler />
    </CustomProvider>
  );
};

export default App;
