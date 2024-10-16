import { Tabs, Box, Text, Separator, ScrollArea } from "@radix-ui/themes";

export function Queries() {
    return (
        <Tabs.Root defaultValue="queries">
            <Tabs.List>
                <Tabs.Trigger value="queries">Saved</Tabs.Trigger>
                <Tabs.Trigger value="history">History</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="queries">
                    <Text size="2">
                        <ScrollArea
                            type="always"
                            scrollbars="vertical"
                            style={{ height: 180 }}
                        >
                            <Box p="1" pr="6">
                                <ul>
                                    <li>Query 1</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 2</li>{" "}
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                    <Separator
                                        orientation="horizontal"
                                        size={"4"}
                                        className="my-1"
                                    />
                                    <li>Query 3</li>
                                </ul>
                            </Box>
                        </ScrollArea>
                    </Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
}
