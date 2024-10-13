import { DataGrid } from "components/DataGrid";
import useApi from "lib/useApi";

export default function ModelsPage() {
    const { data: models } = useApi("/list-models");

    return (
        <DataGrid
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Path", accessor: "path" },
            ]}
            data={models || []}
        />
    );
}
