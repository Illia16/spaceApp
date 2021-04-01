import React from 'react';
import "./404.scss";
import GoBackButton from '../GoBackButton';


const Page404 = () => {
    return (
        <div className="error404Page">
            <h1>Page not found</h1>
            <GoBackButton />
        </div>
    );
};

export default Page404;