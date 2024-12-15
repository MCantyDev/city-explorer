import { useRef } from 'react';
import propTypes from 'prop-types';
import './css/SkipNavigation.css';

// https://kbenbeneck.medium.com/using-scrollintoview-with-react-components-ba41df3ff12

/**
 * 
 * @param {object} props - Reference to the Element to skip to
 * @returns {JSX.Element} - SkipNavigation Component
 */
function SkipNavigation({ reference }) {
    const skipNav = useRef(null); // Reference to the Skip Nav button so we ensure it blurs (goes out of focus)

    // Event Handler for the Skip Navigation button
    const handleSkipClick = (event) => {
        event.preventDefault(); // Prevent the Page reload

        if (reference.current) {
            skipNav.current.blur(); // Unfocus the Skip Nav button
            reference.current.focus(); // Focus on the Main Content
            reference.current.scrollIntoView({ behavior: 'smooth' }); // Scroll to the Main Content with smooth behaviour
        };
    };

    return (
        <button 
        className='skip' 
        onClick={handleSkipClick}
        aria-label='Skip to Main Content'
        ref={skipNav}
        >
            Skip to Main Content
        </button>
    );
}

// Prop Types for SkipNavigation Component
SkipNavigation.propTypes = {
    reference: propTypes.object.isRequired // Reference to the Element to skip to - Required
};

export default SkipNavigation; // Export the SkipNavigation Component