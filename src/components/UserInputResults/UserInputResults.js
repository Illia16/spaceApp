import React, { useState, createContext, useContext } from 'react';

const UserInput = createContext();

// Using UserInput will allow us to grab UserInput's content in any file in the App
export const useInput = () => {
    return useContext(UserInput);
};

// UserInputProvider functional
export default function UserInputProvider({ children }){
    const [userInput, userSelection] = useState({date: '', roverName: '', searchText: ''}); // USER INPUT STORAGE
    const [manifestData, getManifestData] = useState({ spirit:[], opportunity:[], curiosity:[] }); // Manifest Results STORAGE(for rover photos)
    const [results, getData] = useState({ dayPhoto: [], roverPhotos: [], spaceInfo: [] }); // RESULTS STORAGE

    const userSelectedQuery = (e) => {
        e.preventDefault();
        userSelection({...userInput, [e.target.name]: e.target.value})
    };
    
    return(
        <UserInput.Provider value={{
            userSelectedQuery: userSelectedQuery,

            userInput: userInput,
            userSelection: userSelection,

            results: results,
            getData: getData,

            manifestData:manifestData,
            getManifestData:getManifestData,
        }}>
            { children }
        </UserInput.Provider>
    )
};