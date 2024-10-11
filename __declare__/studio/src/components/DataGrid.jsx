import { Button, DropdownMenu } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";

export function DataGrid({ columns, data }) {
    return (
        <Table.Root size="1">
            <Table.Header>
                <Table.Row>
                    {columns.map((column, index) => (
                        <Table.ColumnHeaderCell
                            key={index}
                            className="!font-normal text-neutral-400"
                        >
                            {column.header}
                            {/* {index != columns.length - 1 ? (
                                column.header
                            ) : (
                                <div className="flex ">
                                    <div className="">{column.header}</div>
                                    <div className="ml-auto mr-2  ">
                                        <DropdownMenu.Root>
                                            <DropdownMenu.Trigger>
                                                <Button variant="soft">
                                                    Actions
                                                    <DropdownMenu.TriggerIcon />
                                                </Button>
                                            </DropdownMenu.Trigger>
                                            <DropdownMenu.Content>
                                                <DropdownMenu.Item>
                                                    Export as CSV
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Item>
                                                    Export as Excel
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Separator />
                                                <DropdownMenu.Item>
                                                    Print
                                                </DropdownMenu.Item>
                                                <DropdownMenu.Separator />
                                                <DropdownMenu.Item color="red">
                                                    Delete Selected
                                                </DropdownMenu.Item>
                                            </DropdownMenu.Content>
                                        </DropdownMenu.Root>
                                    </div>
                                </div>
                            )} */}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, rowIndex) => (
                    <Table.Row key={rowIndex}>
                        {columns.map((column, colIndex) => (
                            <Table.Cell key={colIndex}>
                                {row[column.accessor]}
                            </Table.Cell>
                        ))}
                    </Table.Row>
                ))}
            </Table.Body>
        </Table.Root>
    );
}
