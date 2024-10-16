import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { GlobalContext } from "./context";
import { DataGrid } from "@mui/x-data-grid";

export function Results() {
    const {
        queryState: { query, queryId },
        setQuery,
    } = useContext(GlobalContext);
    const {
        data: result,
        isPending,
        error,
    } = useQuery({
        queryKey: queryId,
        queryFn: async () => {
            const response = await fetch("/embed/clickhouse", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query }),
            });
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok, code ${response.status}: ${response.statusText}`
                );
            }
            const data = await response.text();
            try {
                const json = JSON.parse(data);
                return json;
            } catch (e) {
                console.error(e);
                console.log(data);
                throw e;
            }
        },
        enabled: !!query,
    });

    // if (isPending) return "Loading...";
    if (error) return error.message;
    if (result?.error)
        return <pre className="w-full text-wrap">{result.error}</pre>;
    if (result?.exception)
        return <pre className="w-full text-wrap">{result.exception}</pre>;

    // return JSON.stringify(result);
    return (
        <DataGrid
            rows={
                isPending
                    ? []
                    : result.data.map((row, index) => ({
                          id: index,
                          ...row,
                      }))
            }
            columns={
                result?.meta.map((column) => ({
                    field: column.name,
                    headerName: column.name,
                    width: 150,
                })) || []
            }
            rowCount={result?.rows}
            showCellVerticalBorder
            showColumnVerticalBorder
            sx={{
                border: "none", // Removes the outer border
            }}
            rowHeight={35}
            columnHeaderHeight={35}
            slots={{
                noRowsOverlay: () => null,
                footer: () =>
                    typeof result?.rows === "number" && (
                        <div
                            style={{
                                // Bottom right box with row count, translucent background
                                position: "absolute",
                                bottom: 0,
                                right: 0,
                                backgroundColor: "rgba(240, 240, 240, 0.4",
                                padding: "4px 8px",
                                // borderRadius: "4px",
                            }}
                        >
                            {result.rows} rows
                        </div>
                    ),
            }}
        />
    );
}
