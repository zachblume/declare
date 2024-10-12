import { Button, DropdownMenu } from "@radix-ui/themes";
import { TabNav } from "@radix-ui/themes";
import {
    AlertCircle,
    AlertOctagonIcon,
    Layers2Icon,
    Layers3Icon,
    LayersIcon,
    ShapesIcon,
    TriangleAlert,
} from "lucide-react";

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
                <TabNav.Link href="#a" active>
                    Dashboards
                </TabNav.Link>
                <TabNav.Link href="#models">Models</TabNav.Link>
                <TabNav.Link href="#">ETL</TabNav.Link>
                <TabNav.Link href="#">Workflows</TabNav.Link>
                <TabNav.Link href="#">Database</TabNav.Link>
                <TabNav.Link href="#">Monitors</TabNav.Link>
                <TabNav.Link href="#">Logs</TabNav.Link>
                <TabNav.Link href="#">Settings</TabNav.Link>
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
