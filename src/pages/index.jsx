import { DataGrid } from "components/DataGrid";
import useSWR from "swr";

const fetcher = ([url, jwtToken]) =>
    fetch(url, {
        headers: {
            // Authorization: `Bearer ${"jwtToken"}`,
            apikey: "ANON_KEY",
        },
    }).then((res) => res.json());

export default function IndexPage({ jwtToken }) {
    const { data: dashboards, error: dashboardsError } = useSWR(
        ["http://localhost:8000/api/list-dashboards", jwtToken],
        fetcher
    );

    const { data: models, error: modelsError } = useSWR(
        ["http://localhost:8000/api/list-models", jwtToken],
        fetcher
    );

    if (dashboardsError) return <div>Failed to load dashboards</div>;
    if (!dashboards) return <div>Loading dashboards...</div>;

    if (modelsError) return <div>Failed to load models</div>;
    if (!models) return <div>Loading models...</div>;

    return (
        <div>
            <section>
                <h2>Dashboards</h2>
                <DataGrid
                    columns={[
                        { header: "Name", accessor: "name" },
                        { header: "Description", accessor: "description" },
                    ]}
                    data={dashboards}
                />
            </section>
            <section>
                <h2>Models</h2>
                <DataGrid
                    columns={[
                        { header: "Name", accessor: "name" },
                        { header: "Description", accessor: "description" },
                    ]}
                    data={models}
                />
            </section>
        </div>
    );
}
