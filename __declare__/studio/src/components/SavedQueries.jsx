import React, { useState, useEffect } from 'react';

const SavedQueries = () => {
    const [queries, setQueries] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQueries = async () => {
            try {
                const response = await fetch('http://localhost:9998/list-saved-queries');
                if (!response.ok) {
                    throw new Error('Failed to fetch saved queries');
                }
                const data = await response.json();
                setQueries(data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchQueries();
    }, []);

    return (
        <div>
            <h3>Saved Queries</h3>
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <ul>
                {queries.map((query, index) => (
                    <li key={index}>{query}</li>
                ))}
            </ul>
        </div>
    );
};

export default SavedQueries;
