import React, { useRef } from "react";
import "./css/SkipNavigation.css";

function SkipNavigation({ reference }) {
    const skipNav = useRef(null); // Reference to the Skip Nav button so we ensure it blurs (goes out of focus)

    // Event Handler
    const handleSkipClick = (e) => {
        e.preventDefault(); // Prevent the Page reload

        // Checking if reference.current is anything
        if (reference.current) {
            // Bluring the Skip Nav button
            skipNav.current.blur();

            // Focusing on the Main element so the next tab goes to the next interactive element
            reference.current.focus();
             // A Smooth transition to the main content if scrolling is required
            reference.current.scrollIntoView({ behavior: "smooth" });
        };
    };

    return (
        <button 
        tabIndex="0"
        className="skip" 
        onClick={handleSkipClick}
        aria-label="Skip to Main Content"
        ref={skipNav}
        >
            Skip to Main Content
        </button>
    );
}

export default SkipNavigation;