import React from "react";
import ReactDOM from "react-dom/client";
import { Amplify } from "aws-amplify";
import awsExports from "./aws-exports";
import { generateClient } from "@aws-amplify/api"; // ✅ Correct Amplify API Import
import App from "./App";
import "./index.css";

// ✅ Manually configure Amplify
Amplify.configure(awsExports);

// ✅ Manually create API client
const client = generateClient();
console.log("Amplify API Configured:", client);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
