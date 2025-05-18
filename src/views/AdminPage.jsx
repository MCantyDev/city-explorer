/* Base Imports */
import { useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

/* React-Bootstrap Imports */
import Container from 'react-bootstrap/Container';

/* Custom Component Imports */
import Header from '../components/Header';
import Footer from '../components/Footer';
import SkipNavigation from '../components/SkipNavigation';
import UserTable from '../components/admin/UserTable';
import CountryTable from '../components/admin/CountryTable';
import CityWeatherTable from '../components/admin/CityWeatherTable'
import CitySightsTable from '../components/admin/CitySightsTable';
import CityPoiTable from '../components/admin/CityPoiTable';
import DashboardHeader from '../components/admin/DashboardHeader';

/* Custom Hook Imports */
import { useAuth } from '../context/AuthContext';
import { GetProfile } from '../server-communicator/ServerCommunicator';


function AdminPage() {
    const mainRef = useRef(null); // Create a reference to the main element
    const { user, token, loading } = useAuth();
    const navigate = useNavigate()

    if (loading) { return; }
    
    useEffect(() => {
        const authorise = async () => {
            const data = await GetProfile();
            if (!data.isAdmin) {
                navigate('/')
            }
        }
        authorise();
    })

    const [activeSection, setActiveSection] = useState('users');
    const renderSection = () => {
        switch (activeSection) {
            case 'users':
                return <UserTable setActiveSection={setActiveSection} token={token} />;
            case 'countries':
                return <CountryTable setActiveSection={setActiveSection} token={token} />;
            case 'weather':
                return <CityWeatherTable setActiveSection={setActiveSection} token={token} />;
            case 'sights':
                return <CitySightsTable setActiveSection={setActiveSection} token={token} />;
            case 'poi':
                return <CityPoiTable setActiveSection={setActiveSection} token={token} />;
        }
    }

    return (
        <>
            <Helmet>
                <title>Admin Dashboard</title>
            </Helmet>
            <SkipNavigation reference={mainRef} />
            <Header />

            <main ref={mainRef} className='flex-grow-1 d-flex flex-column'>
                <DashboardHeader username={user.username} />
                <Container className='mt-5'>
                    {renderSection()}
                </Container>
            </main>
            <Footer />
        </>
    );
}

export default AdminPage;