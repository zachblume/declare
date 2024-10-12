import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import DatabasePage from "./pages/database";
import ETLPage from "./pages/etl";
import WorkflowsPage from "./pages/workflows";
import MonitorsPage from "./pages/monitors";
import LogsPage from "./pages/logs";
import SettingsPage from "./pages/settings";

export function App({ jwtToken }) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            {useRoutes([
                ...routes,
                { path: "/database", element: <DatabasePage /> },
                { path: "/etl", element: <ETLPage /> },
                { path: "/workflows", element: <WorkflowsPage /> },
                { path: "/monitors", element: <MonitorsPage /> },
                { path: "/logs", element: <LogsPage /> },
                { path: "/settings", element: <SettingsPage /> },
            ])}
        </Suspense>
    );
}
