import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { Theme } from "@radix-ui/themes";
import "./index.css";
import "@radix-ui/themes/styles.css";

const app = createRoot(document.getElementById("root"));

app.render(
    <StrictMode>
        <BrowserRouter>
            <Theme accentColor="green" grayColor="olive">
                <App />
            </Theme>
        </BrowserRouter>
    </StrictMode>
);
