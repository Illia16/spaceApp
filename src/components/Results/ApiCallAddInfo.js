import React, { createContext, useContext } from 'react';
import axios from 'axios';

// grabbing every needed component' logic
import { useInput } from '../UserInputResults/UserInputResults';
import { useError } from '../Error/ErrorContext';
import { useLoading } from '../Loading/LoadingContext';

const ApiCallAddInfo = createContext();
// Using useDayPhoto will allow us to grab useDayPhoto's content in any file in the App
export const useAddInfo = () => {
    return useContext(ApiCallAddInfo);
};

// AddInfo API call logic functional
export default function AddInfoProvider({ children }){
    // using imported functions from other smart components
    const { userInput, userSelection, userSelectedQuery, results, getData } = useInput();
    const { isThereError, showError, errorMsg, setErrorMsg } = useError();
    const { isLoading, setLoading } = useLoading();

    // ADDITIONAL INFO
    const findSpaceInfo = (e) => {
        e.preventDefault();

        // checking if input is empty (no point in making an API call if the input in empty)
        if (!userInput.searchText) {
            showError(true);
            setErrorMsg('The input is empty.');
            return
        } else {
            setLoading({ ...isLoading, searchText: true });
            axios({
                url: `https://images-api.nasa.gov/search`,
                method: 'GET',
                params: {
                    q: userInput.searchText,
                    page: 1,
                }
            })
                .then((res) => {
                    const space = res.data.collection.items;
                    // showing error if there's no results based on the user input
                    if (!space.length) {
                        setLoading({ ...isLoading, searchText: false });
                        showError(true);
                        setErrorMsg('No results found based on your input.');
                    } else {
                        setLoading({ ...isLoading, searchText: false });
                        getData({ ...results, spaceInfo: space });
                    }
                })
                .catch((error) => {
                    setLoading({ ...isLoading, searchText: false });
                    showError(true);
                    setErrorMsg(error.response.data.reason);
                })
        };
    };

    return(
        <ApiCallAddInfo.Provider value={{
            findSpaceInfo: findSpaceInfo,
        }}>
            { children }
        </ApiCallAddInfo.Provider>
    )
};