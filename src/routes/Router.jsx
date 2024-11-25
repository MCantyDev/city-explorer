import React from "react"
import { 
    createBrowserRouter,
    createRoutesFromElements,
    Route,
    RouterProvider
 } from "react-router-dom"
 import { ErrorBoundary } from "react-error-boundary"

/* Views for Routes */
import HomePage from "../views/HomePage"
import CityPage from "../views/CityPage"
import ResultPage from "../views/ResultPage"
import ErrorPage from "../views/ErrorPage"

// React Router Docs - https://reactrouter.com/en/main

// Adjusted Router to proper specified by React Docs
// Added an Error Boundary so that some Error are being Caught
// Needs proper implementation as right now, it is not properly implemented throughout only added to the Router.
// Each component has individual ErrorBoundary as it allows better customisation later in time, even though for now it is all the same.
function AppRouter() 
{
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route 
                    path = "/"
                    element = { 
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <HomePage />
                            </ErrorBoundary>
                            }
                    errorElement = { <ErrorPage /> }
                />,

                <Route 
                    path = "search"
                    element = {   
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <ResultPage />
                            </ErrorBoundary> 
                            }
                    errorElement = { <ErrorPage /> }
                />,
                { /* Doing :country makes it so they are both able to be grabbed from URL and programatically */ }
                <Route 
                    path = "search/:countryCode/:city"
                    element = { 
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <CityPage />
                            </ErrorBoundary> 
                            }
                    errorElement = { <ErrorPage /> }
                />

            </>
        ), {
            future: {
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_skipActionErrorRevalidation: true,
            }
        }
    )
    // Returning a router provider here even though it is not standard i believe to more easily slot into program.
    // Doing it here or not should be fine though
    return (
        <RouterProvider
            router = {router}
            future = {{
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        />
    )
}

export default AppRouter;