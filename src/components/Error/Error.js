import React from 'react';
import "../../styles/app.scss";

const Error = ( props ) => {
    const {propsForError: { closeWindow, errorMsg, errorPopUp } } = props;

    return(
        <div className="popupBack">
            <div className="popup">
                {errorPopUp && <p>{errorMsg}</p>}
                <button onClick={() => closeWindow(false)} >CLOSE</button>
            </div>
        </div>
    );
};

export default Error;