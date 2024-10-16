import routes from "~react-pages";
import { useRoutes } from "react-router-dom";
import { Suspense } from "react";
import { GlobalLayout } from "components/GlobalLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <GlobalLayout>
                <Suspense>{useRoutes([...routes])}</Suspense>
            </GlobalLayout>
        </QueryClientProvider>
    );
}
