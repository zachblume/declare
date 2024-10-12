export default async function handler(req) {
    const { query } = await req.json();

    try {
        const response = await fetch('http://clickhouse:8123', {
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain',
            },
            body: query,
        });

        if (!response.ok) {
            throw new Error('Failed to execute query');
        }

        const data = await response.text();

        return new Response(JSON.stringify(data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
