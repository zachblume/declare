import useSWR from "swr";

const prefix = "http://localhost:8000/api";

export default function useApi(url) {
    // We'll do authentication here
    const fetcher = (url) =>
        fetch(`${prefix}/${url}`, {
            headers: {
                apikey: "ANON_KEY",
            },
        }).then((res) => res.json());
    return useSWR(url, fetcher);
}
