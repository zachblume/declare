import React, { useState, useEffect } from 'react';

const TableMenu = () => {
    const [tables, setTables] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTables = async () => {
            try {
                const response = await fetch('http://localhost:9998/list-tables');
                if (!response.ok) {
                    throw new Error('Failed to fetch tables');
                }
                const data = await response.json();
                setTables(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchTables();
    }, []);

    return (
        <div>
            <h3>Tables</h3>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {tables.map((table, index) => (
                    <li key={index}>{table}</li>
                ))}
            </ul>
        </div>
    );
};

export default TableMenu;
