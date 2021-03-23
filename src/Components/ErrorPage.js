import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Error.css';

export const ErrorPage = () => {
    return (
        <>
            <h1>404 Error Page</h1>
            <p className="subtitle">Page <b>Not Found</b></p>
            <section className="error-container">
                <span className="four"><span class="screen-reader-text">4</span></span>
                <span className="zero"><span class="screen-reader-text">0</span></span>
                <span className="four"><span class="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                <Link to="/" class="more-link">Back to Home</Link>
            </div>
        </>
    )
}