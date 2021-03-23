import React from 'react';
import '../Styles/Loading.css';

export const Loading = () => {
    return(
        <div className="loading-wrapper">
            <div className="loading">
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
            </div>
        </div>
    )
}