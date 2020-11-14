import React from 'react';

const LoadingLogo = () => {
    return(
        <div className="loadingLogo">
            <p>Loading</p>
            <div aria-hidden="true">
                <div className="line" aria-hidden="true"></div>
                <div className="line" aria-hidden="true"></div>
                <div className="line" aria-hidden="true"></div>
            </div>
        </div>
    );
};

export default LoadingLogo;