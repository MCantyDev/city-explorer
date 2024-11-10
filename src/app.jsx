import React from "react"
import ReactDOM from "react-dom"
import { HelmetProvider } from "react-helmet-async" // https://www.npmjs.com/package/react-helmet-async.
import "bootstrap/dist/css/bootstrap.min.css"

import AppRouter from "./routes/Router"

function App()
{
    return (
        <HelmetProvider> 
            <AppRouter />
        </HelmetProvider>
    )
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    // https://react.dev/reference/react/StrictMode. Used for Early development
    <React.StrictMode>
            <App />
    </React.StrictMode>
);

export default App;