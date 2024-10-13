import { DataGrid } from "components/DataGrid";
import useApi from "lib/useApi";

export default function IndexPage() {
    const { data: dashboards } = useApi("/list-dashboards");

    return (
        <DataGrid
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Description", accessor: "description" },
            ]}
            data={dashboards || []}
        />
    );
}
