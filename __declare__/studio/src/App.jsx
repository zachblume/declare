import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { GlobalLayout } from "components/GlobalLayout";

export function App({ jwtToken }) {
    return (
        <Suspense fallback={<p>Loading...</p>}>
            <GlobalLayout>{useRoutes([...routes])}</GlobalLayout>
        </Suspense>
    );
}
