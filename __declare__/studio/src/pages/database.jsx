import { Box } from "@radix-ui/themes";
import { Panels } from "../components/query-editor/Panels";

const DatabasePage = () => {
    return (
        <Box
            className="rounded-lg border border-neutral-700 shadow-sm h-screen w-full"
            style={{ backgroundColor: "var(--background)" }}
        >
            <Panels />
        </Box>
    );
};

export default DatabasePage;
