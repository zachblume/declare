import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";

const BASE_URL_SERVE_MODELS_API = "http://localhost:9002";

export function useModel(endpoint) {
    const [data, setData] = useState(null);

    useEffect(() => {
        fetch(`${BASE_URL_SERVE_MODELS_API}/api/${endpoint.replace(".", "/")}`)
            .then((res) => res.json())
            .then((response) => setData(response.data))
            .catch(console.error);
    }, [endpoint]);

    return data;
}

export function BarChart({ data, x, y }) {
    const barChartOptions = {
        tooltip: {},
        xAxis: {
            data: data?.map((item) => item[x]),
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

    return <ReactECharts option={barChartOptions} />;
}
