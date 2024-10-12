import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { GlobalLayout } from "./components/GlobalLayout";
import DatabasePage from "./pages/database";

export function App({ jwtToken }) {
    return (
        <GlobalLayout>
            <Suspense fallback={<p>Loading...</p>}>
                {useRoutes([
                    ...routes,
                    { path: "/database", element: <DatabasePage /> },
                ])}
            </Suspense>
        </GlobalLayout>
    );
}
