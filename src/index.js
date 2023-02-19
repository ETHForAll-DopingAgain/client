import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import "./index.css";
import { AuthProvider } from "@arcana/auth";
import { ProvideAuth } from "@arcana/auth-react";

const provider = new AuthProvider(`8afe688dafd1119144bb600dae348c712add9daf`);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <App />
);
