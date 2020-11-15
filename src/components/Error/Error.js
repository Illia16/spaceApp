import React from 'react';
import "./errorWindow.scss";

const Error = (props) => {
    const { propsForError: {showError, errorMsg} } = props;

    return(
        <div className="popupBack">
            <div className="popup">
                <p>{errorMsg}</p>
                <button onClick={() => showError(false)} >CLOSE</button>
            </div>
        </div>
    );
};

export default Error;