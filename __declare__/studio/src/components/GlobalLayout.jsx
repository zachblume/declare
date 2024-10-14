import { TabNav } from "@radix-ui/themes";
import { ShapesIcon } from "lucide-react";
import { Link } from "react-router-dom";

export function GlobalLayout({ children }) {
    return (
        <div className="flex flex-col h-screen">
            <Header />
            <main>{children}</main>
            {/* <Footer /> */}
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
        <header className="flex flex-col py-3">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2 px-4">
                    <ShapesIcon
                        className="text-neutral-500 mt-0.5"
                        size={20}
                        strokeWidth={2.1}
                        color="#3ECF8E"
                    />
                    <span className="text-neutral-300 font-semibold">
                        Declare
                    </span>
                    <span className="text-neutral-300 font-medium">/</span>
                    <span className="text-neutral-300 font-light">
                        Current Workspace
                    </span>
                </div>
                <div className="mx-5 w-6 h-6 rounded-full bg-neutral-700 flex items-center justify-center text-xs">
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
        <footer className="mt-auto py-2 border-t border-t-neutral-700 text-center text-neutral-400">
            <p>Footer</p>
        </footer>
    );
}
