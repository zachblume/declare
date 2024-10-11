import { Button, DropdownMenu } from "@radix-ui/themes";
import { TabNav } from "@radix-ui/themes";
import { Layers3Icon } from "lucide-react";

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
        <header className="bg-white py-4 flex flex-col">
            <div className="flex justify-between items-center mb-2">
                <div className="flex items-center space-x-2.5 px-4">
                    <Layers3Icon
                        className="text-neutral-500 mt-0.5"
                        size={17}
                        strokeWidth={1}
                        color="red"
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
                <div className="ml-auto mr-2">
                    <DropdownMenu.Root>
                        <DropdownMenu.Trigger>
                            <Button variant="soft">
                                Actions
                                <DropdownMenu.TriggerIcon />
                            </Button>
                        </DropdownMenu.Trigger>
                        <DropdownMenu.Content>
                            <DropdownMenu.Item shortcut="⌘ E">
                                Edit
                            </DropdownMenu.Item>
                            <DropdownMenu.Item shortcut="⌘ D">
                                Duplicate
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item shortcut="⌘ N">
                                Archive
                            </DropdownMenu.Item>
                            <DropdownMenu.Sub>
                                <DropdownMenu.SubTrigger>
                                    More
                                </DropdownMenu.SubTrigger>
                                <DropdownMenu.SubContent>
                                    <DropdownMenu.Item>
                                        Move to project…
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Item>
                                        Move to folder…
                                    </DropdownMenu.Item>
                                    <DropdownMenu.Separator />
                                    <DropdownMenu.Item>
                                        Advanced options…
                                    </DropdownMenu.Item>
                                </DropdownMenu.SubContent>
                            </DropdownMenu.Sub>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item>Share</DropdownMenu.Item>
                            <DropdownMenu.Item>
                                Add to favorites
                            </DropdownMenu.Item>
                            <DropdownMenu.Separator />
                            <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                                Delete
                            </DropdownMenu.Item>
                        </DropdownMenu.Content>
                    </DropdownMenu.Root>
                </div>
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
