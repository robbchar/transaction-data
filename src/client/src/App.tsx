import { useContext } from "react";
import DataContext from "./DataContext.tsx";

function App() {
  const dataContext = useContext(DataContext);

  return <div>{JSON.stringify(dataContext, null, 2)}</div>;
}

export default App;
