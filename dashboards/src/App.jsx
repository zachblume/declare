import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import "./App.css";

function App() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch("http://localhost:8001/api/ecommerce/orders_moved_from_postgres")
      .then((res) => res.json())
      .then(response=>setData(response.data))
      .catch(console.error);
  }, []);

  const barChartOptions = {
    title: {
      // text: 'Sample Bar Chart'
    },
    tooltip: {},
    xAxis: {
      data: data ? data.map(item => item.product_id) : []
    },
    yAxis: {},
    series: [
      {
        name: 'Sales',
        type: 'bar',
        data: data ? data.map(item => item.amount) : []
      }
    ]
  };

  return (
    <div>
      <p>Hello world</p>
      <ReactECharts option={barChartOptions} />
    </div>
  );
}

export default App;
