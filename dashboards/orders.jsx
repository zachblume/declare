import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const BASE_URL_SERVE_MODELS_API = "http://localhost:9002";

export default function OrdersDashboard() {
    const [data, setData] = useState(null);
    useEffect(() => {
        fetch(
            `${BASE_URL_SERVE_MODELS_API}/api/ecommerce/orders_moved_from_postgres`
        )
            .then((res) => res.json())
            .then((response) => setData(response.data))
            .catch(console.error);
    }, []);

    const barChartOptions = {
        tooltip: {},
        xAxis: {
            data: data ? data.map((item) => item.product_id) : [],
        },
        yAxis: {},
        series: [
            {
                name: "Sales",
                type: "bar",
                data: data ? data.map((item) => item.amount) : [],
            },
        ],
    };

    return (
        <div>
            <p>Hello world</p>
            <ReactECharts option={barChartOptions} />
        </div>
    );
}
