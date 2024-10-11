import { TabNav } from "@radix-ui/themes";
import { Layers3Icon } from "lucide-react";

export function GlobalLayout({ children }) {
    return (
        <div className="global-layout">
            <Header />
            <main>{children}</main>
            <Footer />
        </div>
    );
}

function Header() {
    return (
        <header className="bg-white py-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2.5 px-4">
                    <Layers3Icon
                        className="text-neutral-500 mt-0.5"
                        size={17}
                        strokeWidth={1}
                    />
                    <span className="text-neutral-700">Workspace</span>
                    <span className="text-neutral-700 font-medium">/</span>
                    <span className="text-neutral-700">Current Workspace</span>
                </div>
            </div>
            <TabNav.Root>
                <TabNav.Link href="#a" active>
                    Dashboards
                </TabNav.Link>
                <TabNav.Link href="#">Models</TabNav.Link>
                <TabNav.Link href="#">Connections</TabNav.Link>
                <TabNav.Link href="#">Workflows</TabNav.Link>
                <TabNav.Link href="#">Settings</TabNav.Link>
            </TabNav.Root>
        </header>
    );
}

function Footer() {
    return (
        <footer>
            <p>Footer</p>
        </footer>
    );
}
