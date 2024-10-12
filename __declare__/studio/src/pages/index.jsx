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
    const { data: dashboards, error } = useSWR(
        ["http://localhost:8000/api/list-dashboards", jwtToken],
        fetcher
    );

    if (error) return <div>Failed to load dashboards</div>;
    if (!dashboards) return <div>Loading...</div>;

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
