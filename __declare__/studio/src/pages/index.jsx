import { DataGrid } from "components/DataGrid";

export default function IndexPage() {
    const dashboards = [
        { name: "Sales Dashboard", description: "Overview of sales metrics" },
        {
            name: "Marketing Dashboard",
            description: "Marketing campaign performance",
        },
        {
            name: "Finance Dashboard",
            description: "Financial health and metrics",
        },
        {
            name: "Product Dashboard",
            description: "Product performance and metrics",
        },
        {
            name: "Customer Dashboard",
            description: "Customer engagement and metrics",
        },
        {
            name: "Operations Dashboard",
            description: "Operational metrics and performance",
        },
        {
            name: "Engineering Dashboard",
            description: "Engineering metrics and performance",
        },
        {
            name: "HR Dashboard",
            description: "Human resources metrics and performance",
        },
    ];

    return (
        <DataGrid
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Description", accessor: "description" },
            ]}
            data={dashboards}
        />
    );
}
