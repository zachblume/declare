import { Button, DropdownMenu } from "@radix-ui/themes";
import { Table } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

function ClickableTableRow({ row, columns }) {
    const navigate = useNavigate();

    const handleRowClick = () => {
        if (row.href) {
            navigate(row.href);
        }
    };

    return (
        <Table.Row
            onClick={handleRowClick}
            style={{ cursor: row.href ? "pointer" : "default" }}
        >
            {columns.map((column, colIndex) => (
                <Table.Cell key={colIndex}>{row[column.accessor]}</Table.Cell>
            ))}
        </Table.Row>
    );
}

export function DataGrid({ columns, data }) {
    return (
        <Table.Root size="1" variant="surface">
            <Table.Header>
                <Table.Row>
                    {columns.map((column, index) => (
                        <Table.ColumnHeaderCell
                            key={index}
                            className="!font-normal text-neutral-400"
                        >
                            {column.header}
                        </Table.ColumnHeaderCell>
                    ))}
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {data.map((row, rowIndex) => (
                    <ClickableTableRow
                        key={rowIndex}
                        row={row}
                        columns={columns}
                    />
                ))}
            </Table.Body>
        </Table.Root>
    );
}
