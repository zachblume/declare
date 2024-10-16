export default async function handler(req) {
    const { query } = await req.json();

    try {
        const response = await fetch(
            `http://declare-warehouse-clickhouse:8123/?default_format=JSON&query=${encodeURIComponent(
                query
            )}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "text/plain",
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to execute query");
        }

        const data = await response.text();
        return new Response(data, { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 500,
        });
    }
}
