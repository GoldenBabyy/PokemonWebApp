import React from 'react';
import { Link } from 'react-router-dom';
import '../Styles/Error.css';

export const ErrorPage = () => {
    return (
        <>
            <h1>404 Error Page</h1>
            <p class="subtitle">Page <b>Not Found</b></p>
            <section class="error-container">
                <span class="four"><span class="screen-reader-text">4</span></span>
                <span class="zero"><span class="screen-reader-text">0</span></span>
                <span class="four"><span class="screen-reader-text">4</span></span>
            </section>
            <div class="link-container">
                <Link to="/" class="more-link">Back to Home</Link>
            </div>
        </>
    )
}