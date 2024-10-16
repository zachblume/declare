import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import { Queries } from "./Queries";
import { Structure } from "./Structure";
import { QueryEditor } from "./QueryEditor";
import { Results } from "./Results";
import { GlobalContext } from "./context";
import { useState } from "react";
// import { randomUUID } from "../../lib/randomUUID";

export function Panels() {
    const [queryState, setQuery] = useState({
        query: null,
        queryId: null,
    });
    return (
        <GlobalContext.Provider value={{ queryState, setQuery }}>
            <PanelGroup
                direction="horizontal"
                autoSaveId="persistence"
                className="h-full w-full"
            >
                <Panel defaultSize={30}>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={30} className="py-1 px-2">
                            <Queries />
                        </Panel>
                        <PanelResizeHandle
                            className="h-px hover:bg-blue-500 bg-gray-200"
                            // style={{ backgroundColor: "var(--foreground)" }}
                        />
                        <Panel defaultSize={70} className="py-1 px-2">
                            <Structure />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle
                    className="w-px hover:bg-blue-500 bg-gray-200"
                    // style={{ backgroundColor: "var(--foreground)" }}
                />
                <Panel>
                    <PanelGroup direction="vertical">
                        <Panel defaultSize={50} className="">
                            <QueryEditor />
                        </Panel>
                        <PanelResizeHandle
                            className="h-px hover:bg-blue-500 bg-gray-200"
                            // style={{ backgroundColor: "var(--foreground)" }}
                        />
                        <Panel defaultSize={50} className="">
                            <Results />
                        </Panel>
                    </PanelGroup>
                </Panel>
            </PanelGroup>
        </GlobalContext.Provider>
    );
}
