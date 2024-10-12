import { TabNav } from "@radix-ui/themes";
import { ShapesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function GlobalLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

function Header() {
    const routes = [
        { path: "/", label: "Dashboards" },
        { path: "/models", label: "Models" },
        { path: "/etl", label: "ETL" },
        { path: "/workflows", label: "Workflows" },
        { path: "/database", label: "Database" },
        { path: "/monitors", label: "Monitors" },
        { path: "/logs", label: "Logs" },
        { path: "/settings", label: "Settings" },
    ];

    return (
        <header className="bg-white flex flex-col py-3">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2.5 px-4">
                    <ShapesIcon
                        className="text-neutral-500 mt-0.5"
                        size={17}
                        strokeWidth={2}
                        color="green"
                    />
                    <span className="text-neutral-700">Declare</span>
                    <span className="text-neutral-700 font-medium">/</span>
                    <span className="text-neutral-700 font-light">
                        Current Workspace
                    </span>
                </div>
                <div className="mx-3 w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                    <span className="text-white">U</span>
                </div>
            </div>
            <TabNav.Root>
                {routes.map((route) => (
                    <TabNav.Link
                        key={route.path}
                        asChild
                        active={window.location.pathname === route.path}
                    >
                        <Link to={route.path}>{route.label}</Link>
                    </TabNav.Link>
                ))}
            </TabNav.Root>
        </header>
    );
}

function Footer() {
    return (
        <footer className="mt-auto py-2 bg-neutral-50 text-center">
            <p>Footer</p>
        </footer>
    );
}
