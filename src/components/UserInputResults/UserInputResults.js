import React, { useState, createContext, useContext } from 'react';

const UserInput = createContext();

// Using UserInput will allow us to grab UserInput's content in any file in the App
export const useInput = () => {
    return useContext(UserInput);
};

// UserInputProvider functional
export default function UserInputProvider({ children }){
    const [userInput, userSelection] = useState({date: '', roverName: '', searchText: ''}); // USER INPUT STORAGE
    const [results, getData] = useState({ dayPhoto: [], manifestData: [], roverPhotos: [], spaceInfo: [] }); // RESULTS

    const userSelectedQuery = (e) => {
        e.preventDefault();
        userSelection({...userInput, [e.target.name]: e.target.value})
    };
    
    return(
        <UserInput.Provider value={{
            userInput: userInput,
            userSelection: userSelection,
            userSelectedQuery: userSelectedQuery,
            results: results,
            getData: getData,
        }}>
            { children }
        </UserInput.Provider>
    )
};