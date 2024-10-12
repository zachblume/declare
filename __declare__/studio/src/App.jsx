import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { GlobalLayout } from "./components/GlobalLayout";

export function App({ jwtToken }) {
    const fetchDashboards = async () => {
        const response = await fetch("/api/list-dashboards", {
            headers: {
                Authorization: `Bearer ${jwtToken}`,
            },
        });
        const data = await response.json();
        return data;
    };

    return (
        <GlobalLayout>
            <Suspense fallback={<p>Loading...</p>}>
                {useRoutes(routes)}
            </Suspense>
        </GlobalLayout>
    );
}
