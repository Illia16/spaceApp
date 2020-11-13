import React from 'react';
import "../../styles/app.scss";

// grabbing Error component logic
import { useError } from './ErrorContext';

const Error = () => {
    const { isThereError, errorMsg } = useError();

    return(
        <div className="popupBack">
            <div className="popup">
                <p>{errorMsg}</p>
                <button onClick={() => isThereError(false)} >CLOSE</button>
            </div>
        </div>
    );
};

export default Error;