import React from 'react';
import { NavLink } from 'react-router-dom';

const GoBackButton = (props) => {
    const { changePage } = props

    return(
        changePage ? 
        <div className="seeResLink">
            <NavLink to={`/`} className="goBackLink" onClick={() => changePage('')} >GO BACK</NavLink>
        </div>
        :         
        <div className="seeResLink">
            <NavLink to={`/`} className="goBackLink">GO BACK</NavLink>
        </div>
    );
};

export default GoBackButton;