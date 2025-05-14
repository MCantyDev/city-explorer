import { 
    createBrowserRouter,
    createRoutesFromElements,
    Navigate,
    Route,
    RouterProvider
 } from 'react-router-dom'
 import { ErrorBoundary } from 'react-error-boundary'
 import UserProtectedRoute from './UserProtectedRoute'
 import AdminProtectedRoute from './AdminProtectedRoute'

/* Views for Routes */
import HomePage from '../views/HomePage'
import CityPage from '../views/CityPage'
import ResultPage from '../views/ResultPage'
import ErrorPage from '../views/ErrorPage'
import LoginPage from '../views/LoginPage'
import AdminPage from '../views/AdminPage'
import SignUpPage from '../views/SignUpPage'

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
                    path = '/'
                    element = { 
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <HomePage />
                            </ErrorBoundary>
                            }
                    errorElement = { <ErrorPage /> }
                />,
                <Route 
                    path = 'search'
                    element = {   
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <UserProtectedRoute requireLogin={true}>
                                    <ResultPage />
                                </UserProtectedRoute>
                            </ErrorBoundary> 
                            }
                    errorElement = { <ErrorPage /> }
                />,
                { /* Doing :country makes it so they are both able to be grabbed from URL and programatically */ }
                <Route 
                    path = 'search/:countryCode/:city'
                    element = { 
                            <ErrorBoundary FallbackComponent={ErrorPage}>
                                <UserProtectedRoute requireLogin={true}>
                                    <CityPage />
                                </UserProtectedRoute>
                            </ErrorBoundary> 
                            }
                    errorElement = { <ErrorPage /> }
                />,
                <Route
                    path = 'login'
                    element = {
                        <ErrorBoundary FallbackComponent={ErrorPage}>
                            <UserProtectedRoute requireLogin={false}>
                                <LoginPage />
                            </UserProtectedRoute>
                        </ErrorBoundary>
                    }
                    errorElement = { <ErrorPage /> }
                />,
                <Route
                    path = 'sign-up'
                    element = {
                        <ErrorBoundary FallbackComponent={ErrorPage}>
                            <UserProtectedRoute requireLogin={false}>
                                <SignUpPage />
                            </UserProtectedRoute>
                        </ErrorBoundary>
                    }
                    errorElement = { <ErrorPage /> }
                />,
                <Route
                    path = 'admin'
                    element = {
                        <ErrorBoundary FallbackComponent={ErrorPage}>
                            <AdminProtectedRoute>
                                <AdminPage />
                            </AdminProtectedRoute>
                        </ErrorBoundary>
                    }
                    errorElement = { <ErrorPage /> }
                    
                />,
                {/* Catch any Routes that are not registered */}
                <Route
                    path = '*'
                    element={<Navigate to="/" replace />}
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