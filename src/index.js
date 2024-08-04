import React from "react"
import ReactDom from "react-dom/client"
import App from "./App";

const container = document.getElementById('root');
const root = ReactDom.createRoot(container); // createRoot(container!) if you use TypeScript

root.render(<App></App>);