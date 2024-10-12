import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { GlobalLayout } from "components/GlobalLayout";

export function App({ jwtToken }) {
    return (
        <GlobalLayout>
            <Suspense>{useRoutes([...routes])}</Suspense>
        </GlobalLayout>
    );
}
