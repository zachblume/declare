import { DataGrid } from "components/DataGrid";
import useApi from "lib/useApi";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const { data: dashboards } = useApi("/list-dashboards");

    return (
        <DataGrid
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Description", accessor: "description" },
            ]}
            data={
                dashboards
                    ?.map(
                        // rename from .jsx at end to nothing
                        (dashboard) => ({
                            ...dashboard,
                            name: dashboard.name.replace(/\.jsx$/, ""),
                        })
                    )
                    ?.map(
                        // add a href to the dashboard path
                        (dashboard) => ({
                            ...dashboard,
                            href: `/dashboards/${dashboard.name}`,
                        })
                    ) || []
            }
        />
    );
}
