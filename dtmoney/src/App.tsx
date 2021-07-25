import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { GlobalStyle } from "./styles/global";

export function App() {
  return (

  //react fragment evitando div desnecessaria no projeto
  //component header importado e sendo utilizado com sucesso no App.tsx
    <> 
    
      <Header />
      <Dashboard />
      <GlobalStyle />
    </>
  );
}

