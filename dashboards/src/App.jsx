import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8001/api/ecommerce/orders_moved_from_postgres")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  return <>Hello world: ${JSON.stringify(data)}</>;
}

export default App;
