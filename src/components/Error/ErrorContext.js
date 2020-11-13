import React, { useState, createContext, useContext } from 'react';

const ErrorContext = createContext();

export const useError = () => {
    return useContext(ErrorContext);
};

export default function ErrorProvider({ children }){
    const [errorPopUp, isThereError] = useState(false); // ERROR T/F
    const [errorMsg, setErrorMsg] = useState(''); // ERROR MESSAGE
    
    return(
        <ErrorContext.Provider value={{
            errorPopUp: errorPopUp,
            isThereError: isThereError,
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,
        }}>
            { children }
        </ErrorContext.Provider>
    )
};