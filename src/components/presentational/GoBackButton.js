import React from 'react';
import { NavLink } from 'react-router-dom';

const GoBackButton = () => {
    return(
        <div className="seeResLink">
            <NavLink to={`/`} className="goBackLink">GO BACK</NavLink>
        </div>
    );
};

export default GoBackButton;