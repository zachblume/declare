export default async function handler() {
    try {
        const response = await fetch('http://clickhouse:8123', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: 'SHOW TABLES',
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to fetch tables');
        }

        const data = await response.json();
        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
