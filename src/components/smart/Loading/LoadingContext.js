import React, { useState, createContext, useContext } from 'react';

const LoadingContext = createContext();

// Using UserInput will allow us to grab UserInput's content in any file in the App
export const useLoading = () => {
    return useContext(LoadingContext);
};

// UserInputProvider functional
export default function LoadingProvider({ children }){
    const [isLoading, setLoading] = useState({date: false, roverName: false, searchText: false}); // LOADING OR NOT
    
    return(
        <LoadingContext.Provider value={{
            isLoading: isLoading,
            setLoading: setLoading,
        }}>
            { children }
        </LoadingContext.Provider>
    )
};