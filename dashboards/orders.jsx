import { BarChart, useModel } from "declare-dashboards/lib";

export default function OrdersDashboard() {
    const data = useModel("ecommerce.orders_moved_from_postgres");

    return (
        <div>
            <p>Hello world</p>
            <BarChart data={data} />
        </div>
    );
}
