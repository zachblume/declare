import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import "./index.css";
import "@radix-ui/themes/styles.css";
import { Theme, Button } from "@radix-ui/themes";

const app = createRoot(document.getElementById("root"));

app.render(
    <StrictMode>
        <BrowserRouter>
            <Theme accentColor="gray" grayColor="olive">
                <App />
            </Theme>
        </BrowserRouter>
    </StrictMode>
);
