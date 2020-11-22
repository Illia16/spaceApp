import React, { createContext, useContext } from 'react';
import axios from 'axios';

// grabbing every needed component' logic
import { useInput } from '../UserInputResults/UserInputResults';
import { useError } from '../Error/ErrorContext';
import { useLoading } from '../Loading/LoadingContext';

// FUNCTIONS
import setTodayDate from '../../helpers/setTodayDate/setTodayDate';

const ApiCallDayPhoto = createContext();
// Using useDayPhoto will allow us to grab useDayPhoto's content in any file in the App
export const useDayPhoto = () => {
    return useContext(ApiCallDayPhoto);
};

// DayPhoto API call logic functional
export default function DayPhotoProvider({ children }){
    // using imported functions from other smart components
    const { userInput, userSelection, userSelectedQuery, results, getData } = useInput();
    const { isThereError, showError, errorMsg, setErrorMsg } = useError();
    const { isLoading, setLoading } = useLoading();


    // APOD CALL
    const findPhotoDay = (e) => {
        e.preventDefault();

        setLoading({...isLoading, date: true });
        axios({
            url: `https://api.nasa.gov/planetary/apod`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                date: userInput.date || setTodayDate(),
            }
        }).then( (res) => {
            setLoading({...isLoading, date: false });
            getData({...results, dayPhoto: res.data});

            userSelection({...userInput, date: res.data.date})

        }).catch( error => {
            setLoading({...isLoading, date: false });
            showError(true);
            setErrorMsg(error.response.data.msg);
        })
    };

    return(
        <ApiCallDayPhoto.Provider value={{
            findPhotoDay: findPhotoDay,
        }}>
            { children }
        </ApiCallDayPhoto.Provider>
    )
};