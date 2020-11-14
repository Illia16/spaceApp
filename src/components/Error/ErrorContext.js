import React, { useState, createContext, useContext } from 'react';

const ErrorContext = createContext();

// Using useError will allow us to grab ErrorContext's content in any file under ErrorProvider
export const useError = () => {
    return useContext(ErrorContext);
};

// Error functional
export default function ErrorProvider({ children }){
    const [isThereError, showError] = useState(false); // ERROR T/F
    const [errorMsg, setErrorMsg] = useState(''); // ERROR MESSAGE
    
    return(
        <ErrorContext.Provider value={{
            isThereError: isThereError,
            showError: showError,
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,
        }}>
            { children }
        </ErrorContext.Provider>
    )
};