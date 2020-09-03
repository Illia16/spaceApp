import React from 'react';
import "./styles/app.scss";

const Error = ( props ) => {
    // const {states:{ longest:{userInput, userInputQuantity}}, error:{noText, tooLongWord}, closeWindow, closeWindowText} = props;
    const {states:{errorMsg:{badDate, emptyInput, noData, noRover}, date, roverName, searchText},  closeWindow } = props;
    console.log(props);

    return(
        <div className="popupBack">
            <div className="popup">
                {/* showing the right type of error */}

                {
                (badDate) ? <p>{badDate}</p> : null
                }

                {
                (noRover) ? <p>{noRover}</p> : null
                }

                {
                (emptyInput) ? <p>{emptyInput}</p> : null
                }

                <button onClick={closeWindow} >CLOSE</button>
            </div>
        </div>
    );
};

export default Error;