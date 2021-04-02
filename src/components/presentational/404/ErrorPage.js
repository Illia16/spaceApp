import React from 'react';
import "./ErrorPage.scss";
import GoBackButton from '../GoBackButton';

const ErrorPage = (errorMsg) => {
    return (
        <div className="errorPage">
            <h1>{errorMsg}</h1>
            <GoBackButton />
        </div>
    );
};

export default ErrorPage;