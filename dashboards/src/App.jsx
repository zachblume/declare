import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8001/api/ecommerce/orders_moved_from_postgres")
      .then((res) => res.json())
      .then(setData)
      .catch(console.error);
  }, []);

  const barChartOptions = {
    title: {
      text: 'Sample Bar Chart'
    },
    tooltip: {},
    xAxis: {
      data: ['Category1', 'Category2', 'Category3', 'Category4', 'Category5']
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: [5, 20, 36, 10, 10]
      }
    ]
  };

  return (
    <div>
      <h1>Hello world</h1>
      <ReactECharts option={barChartOptions} />
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default App;
