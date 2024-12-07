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

/**
 * React Router Component to handle the routing of the Application based on the URL
 * @returns {JSX.Element} - RouterProvider Component
 */
function AppRouter() 
{
    const router = createBrowserRouter( // Create a BrowserRouter
        createRoutesFromElements( // Create Routes from the Elements
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
        ), { // Options for the router
            future: {
                v7_fetcherPersist: true,
                v7_normalizeFormMethod: true,
                v7_partialHydration: true,
                v7_skipActionErrorRevalidation: true,
            }
        }
    )

    return (
        // RouterProvider is used to provide the Router Context to the App
        <RouterProvider 
            // Router is the router created above
            router = {router}
            future = {{ 
                // Options for the RouterProvider
                v7_startTransition: true,
                v7_relativeSplatPath: true,
            }}
        />
    )
}

export default AppRouter;