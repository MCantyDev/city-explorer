import React from "react";
import { useRouteError } from "react-router-dom";


function ErrorPage() {
    let error = useRouteError()
    console.error(error);
    return (
        <>
            <h1>Error!</h1>
        </>
    )
}

export default ErrorPage;