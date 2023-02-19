import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '@arcana/auth';
import App from "./App";
import { ProvideAuth } from "@arcana/auth-react";

const root = ReactDOM.createRoot(document.getElementById("root"));
const provider = new AuthProvider(`8afe688dafd1119144bb600dae348c712add9daf`);
provider.init();


root.render(
  <ProvideAuth provider={provider}>
    <App />
  </ProvideAuth>
);
