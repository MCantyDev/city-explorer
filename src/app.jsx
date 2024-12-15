import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async'; // https://www.npmjs.com/package/react-helmet-async.
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

/* Custom Component Imports */
import AppRouter from './routes/Router';

/**
 * Entry point to the Application
 * @returns {JSX.Element} - App Component
 */
function App()
{
    return (
            <HelmetProvider> {/* HelmetProvider is used to provide the Helmet Context to the App */}
                <AppRouter /> {/* AppRouter Component renders pages based on the web address */}
            </HelmetProvider>
    );
}

// ReactDOM.createRoot is used to create a root for the application to render into the DOM
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render( // ReactDOM.render is used to render the application into the DOM
    <App /> // App Component is rendered into the DOM
);

export default App;