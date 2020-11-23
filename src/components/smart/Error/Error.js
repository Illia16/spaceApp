import React from 'react';
import "./errorWindow.scss";
import FocusTrap from 'focus-trap-react'

const Error = (props) => {
    const { propsForError: { showError, errorMsg } } = props;

    return (
        <div className="popupBack">
            <FocusTrap focusTrapOptions={{
                escapeDeactivates : false,
            }}>
                <div className="popup">
                    <p>{errorMsg}</p>
                    <button onClick={() => showError(false)}>CLOSE</button>
                </div>
            </FocusTrap>
        </div>
    );
};

export default Error;