import React from 'react';
import "../styles/app.scss";

const Error = ( props ) => {
    const {propsForError: { states:{ errorMsg:{ badDate, emptyInput, noData, noRover }, searchText, spaceInfo },  closeWindow } } = props;
    
    return(
        <div className="popupBack">
            <div className="popup">
                {/* showing the right type of error */}

                {/* ERROR IF THERE'S A DATE SELECTED beyond the acceptable date from API; badDate - error msg from API*/}
                {
                (badDate) ? <p>{badDate}</p> : null
                }

                {/* ERROR IF THERE'S NO ROVER SELECTED; noRover - error msg from API;
                this is only applicable if we have input text instead of input select*/}
                {
                (noRover) ? <p>{noRover}</p> : null
                }

                {/* ERROR IF THERE'S search input; emptyInput - error msg from API*/}
                {
                (emptyInput && !searchText) ? <p>{emptyInput}</p> : null
                }
                
                {/* ERROR IF THERE'S NO RESULTS BASED on the user search input; spaceInfo - array of results*/}
                {
                // (spaceInfo && searchText) ? <p>{noData}</p> : null
                (spaceInfo && searchText && !noRover && !badDate) ? <p>{noData}</p> : null
                }

                <button onClick={closeWindow} >CLOSE</button>
            </div>
        </div>
    );
};

export default Error;