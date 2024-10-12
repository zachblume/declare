import { DataGrid } from "components/DataGrid";
import useSWR from "swr";

const fetcher = ([url, jwtToken]) =>
    fetch(url, {
        headers: {
            // Authorization: `Bearer ${"jwtToken"}`,
            apikey: "ANON_KEY",
        },
    }).then((res) => res.json());

export default function ModelsPage({ jwtToken }) {
    const { data: models, error } = useSWR(
        ["http://localhost:8000/api/list-models", jwtToken],
        fetcher
    );

    if (error) return <div>Failed to load models</div>;
    if (!models) return <div>Loading...</div>;

    return (
        <DataGrid
            columns={[
                { header: "Name", accessor: "name" },
                { header: "Description", accessor: "description" },
            ]}
            data={models}
        />
    );
}
