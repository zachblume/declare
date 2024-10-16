import { Tabs, Box, Text } from "@radix-ui/themes";

export function Structure() {
    // This is a list of all the schemas and tables:
    return (
        <Tabs.Root defaultValue="tables">
            <Tabs.List>
                <Tabs.Trigger value="tables">Tables</Tabs.Trigger>
            </Tabs.List>

            <Box pt="3">
                <Tabs.Content value="tables">
                    <Text size="2">
                        {/* A radix list: */}
                        <ul>
                            <li>Schema 1</li>
                            <li>Schema 2</li>
                            <li>Schema 3</li>
                            <li>Schema 4</li>
                            <li>Schema 5</li>
                        </ul>
                    </Text>
                </Tabs.Content>
            </Box>
        </Tabs.Root>
    );
}
