import { Table } from "@radix-ui/themes";

export default function IndexPage() {
    const dashboards = [
        { name: "Sales Dashboard", description: "Overview of sales metrics" },
        {
            name: "Marketing Dashboard",
            description: "Marketing campaign performance",
        },
        {
            name: "Finance Dashboard",
            description: "Financial health and metrics",
        },
    ];

    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell className="!font-normal text-neutral-400">
                        Name
                    </Table.ColumnHeaderCell>
                    <Table.ColumnHeaderCell className="!font-normal text-neutral-400">
                        Description
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {dashboards.map((dashboard, index) => (
                    <Table.Row key={index}>
                        <Table.RowHeaderCell>
                            {dashboard.name}
                        </Table.RowHeaderCell>
                        <Table.Cell>{dashboard.description}</Table.Cell>
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
