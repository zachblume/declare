"use client";
import Editor from "@monaco-editor/react";
import { useCallback, useContext, useEffect, useRef } from "react";
import { GlobalContext } from "./context";
import { randomUUID } from "../../lib/randomUUID";
import { Button } from "@radix-ui/themes";

export function QueryEditor() {
    const { setQuery } = useContext(GlobalContext);
    const queryEditorState = useRef("SELECT * FROM example;");
    const monacoRef = useRef(null);

    const trigger = useCallback(() => {
        const editorInstance = monacoRef.current?.editor;
        const monacoInstance = monacoRef.current?.monaco;

        if (editorInstance && monacoInstance) {
            const model = editorInstance.getModel();
            const selection = editorInstance.getSelection();
            const selectedText = model.getValueInRange(selection);

            if (selectedText && selectedText.trim() !== "") {
                // If text is selected, run the selected text
                setQuery({ query: selectedText, queryId: randomUUID() });
            } else {
                // No text selected, get current cursor position
                const position = editorInstance.getPosition(); // { lineNumber, column }
                const fullText = model.getValue();
                const cursorOffset = model.getOffsetAt(position);

                // Find the last semicolon before the cursor
                const textBeforeCursor = fullText.slice(0, cursorOffset);
                const lastSemicolonBeforeCursor =
                    textBeforeCursor.lastIndexOf(";");

                // Find the next semicolon after the cursor
                const textAfterCursor = fullText.slice(cursorOffset);
                const nextSemicolonAfterCursor = textAfterCursor.indexOf(";");

                // Determine the start and end offsets of the current statement
                let statementStartOffset =
                    lastSemicolonBeforeCursor !== -1
                        ? lastSemicolonBeforeCursor + 1
                        : 0;
                let statementEndOffset =
                    nextSemicolonAfterCursor !== -1
                        ? cursorOffset + nextSemicolonAfterCursor + 1
                        : fullText.length;

                // Adjust statementStartOffset to skip leading whitespace
                while (
                    statementStartOffset < statementEndOffset &&
                    /\s/.test(fullText.charAt(statementStartOffset))
                ) {
                    statementStartOffset++;
                }

                // If the last character before statementEndOffset is a semicolon, include it
                if (fullText.charAt(statementEndOffset) === ";") {
                    statementEndOffset++;
                }

                // Extract the statement text
                let statementText = fullText
                    .slice(statementStartOffset, statementEndOffset)
                    .trim();

                // Handle edge case: cursor is after a semicolon on a line with only whitespace after it
                const lineContent = model.getLineContent(position.lineNumber);
                const semicolonIndexInLine = lineContent.indexOf(";") + 1;
                if (
                    semicolonIndexInLine !== -1 &&
                    position.column > semicolonIndexInLine
                ) {
                    const afterSemicolonText = lineContent
                        .slice(semicolonIndexInLine + 1)
                        .trim();
                    if (afterSemicolonText === "") {
                        // Run the previous statement
                        const textBeforeLastSemicolon = fullText.slice(
                            0,
                            lastSemicolonBeforeCursor
                        );
                        const previousSemicolon =
                            textBeforeLastSemicolon.lastIndexOf(";");
                        statementStartOffset =
                            previousSemicolon !== -1
                                ? previousSemicolon + 1
                                : 0;
                        statementEndOffset = lastSemicolonBeforeCursor;

                        // If the last character before statementEndOffset is a semicolon, include it
                        if (fullText.charAt(statementEndOffset) === ";") {
                            statementEndOffset++;
                        }

                        // Adjust statementStartOffset to skip leading whitespace
                        while (
                            statementStartOffset < statementEndOffset &&
                            /\s/.test(fullText.charAt(statementStartOffset))
                        ) {
                            statementStartOffset++;
                        }

                        statementText = fullText
                            .slice(statementStartOffset, statementEndOffset)
                            .trim();
                    }
                }

                if (statementText && statementText.trim() !== "") {
                    // Convert offsets to positions
                    const startPosition =
                        model.getPositionAt(statementStartOffset);
                    const endPosition = model.getPositionAt(statementEndOffset);

                    // Set the selection to the statement range
                    editorInstance.setSelection(
                        new monacoInstance.Selection(
                            startPosition.lineNumber,
                            startPosition.column,
                            endPosition.lineNumber,
                            endPosition.column
                        )
                    );

                    // Run the query
                    setQuery({ query: statementText, queryId: randomUUID() });
                }
            }
        }
    }, [setQuery]);

    const cancel = useCallback(() => {
        // Implement your cancel logic here
        setQuery({ cancel: true });
    }, [setQuery]);

    useEffect(() => {
        const listener = (event) => {
            if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) {
                event.preventDefault();
                event.stopPropagation();
                trigger();
            }
        };
        window.addEventListener("keydown", listener);
        return () => window.removeEventListener("keydown", listener);
    }, [trigger]);

    const handleEditorDidMount = (editor, monaco) => {
        monacoRef.current = { editor, monaco };
        editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter, () => {
            trigger();
        });
    };

    return (
        <div className="relative w-full h-full">
            <Editor
                defaultValue={queryEditorState.current}
                value={queryEditorState.current}
                onChange={(value) => {
                    queryEditorState.current = value;
                }}
                defaultLanguage="sql"
                options={{
                    glyphMargin: false,
                    folding: false,
                    lineNumbers: "on",
                    lineNumbersMinChars: 3,
                    minimap: { enabled: false },
                    overviewRulerLanes: 0,
                    scrollbar: {
                        vertical: "auto",
                        horizontal: "hidden",
                        handleMouseWheel: false,
                    },
                    wordWrap: "on",
                }}
                onMount={handleEditorDidMount}
                theme="vs-dark"
            />
            <div className="absolute bottom-2 right-3 flex gap-2">
                <Button onClick={cancel} variant="soft" color="ruby" disabled>
                    Cancel
                </Button>
                <Button onClick={trigger}>Execute</Button>
            </div>
        </div>
    );
}
