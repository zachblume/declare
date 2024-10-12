import React, { useState } from 'react';

const QueryEditor = () => {
    const [query, setQuery] = useState('');
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleQueryChange = (e) => {
        setQuery(e.target.value);
    };

    const executeQuery = async () => {
        try {
            const response = await fetch('http://localhost:9998/query-clickhouse', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query }),
            });

            if (!response.ok) {
                throw new Error('Failed to execute query');
            }

            const data = await response.json();
            setResult(data);
            setError(null);
        } catch (err) {
            setError(err.message);
            setResult(null);
        }
    };

    return (
        <div>
            <textarea
                value={query}
                onChange={handleQueryChange}
                placeholder="Write your SQL query here"
                rows="10"
                cols="50"
            />
            <button onClick={executeQuery}>Execute Query</button>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {result && (
                <div>
                    <h3>Query Result:</h3>
                    <pre>{JSON.stringify(result, null, 2)}</pre>
                </div>
            )}
        </div>
    );
};

export default QueryEditor;
