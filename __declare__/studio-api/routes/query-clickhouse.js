import axios from 'axios';

export default async function handler(req) {
    const { query } = await req.json();

    try {
        const response = await axios.post('http://clickhouse-server:8123', query, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });

        return new Response(JSON.stringify(response.data), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
