import React, { useState, useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// FUNCTIONS
import setTodayDate from '../../helpers/setTodayDate/setTodayDate';

const UserInput = createContext();

// Using UserInput will allow us to grab UserInput's content in any file in the App
export const useLogic = () => {
    return useContext(UserInput);
};

// AppContext functional
export default function AppContext({ children }){
    const [userInput, userSelection] = useState({date: '', roverName: '', searchText: ''}); // USER INPUT STORAGE
    const [manifestData, getManifestData] = useState({ spirit: '', opportunity: '', curiosity: '' }); // Manifest Results STORAGE(for rover photos)
    const [results, getData] = useState({ dayPhoto: [], roverPhotos: [], spaceInfo: [] }); // RESULTS STORAGE

    const [currentPage, changePage] = useState(''); // RESULTS PAGE STORAGE

    //Error stuff
    const [isThereError, showError] = useState(false); // ERROR T/F
    const [errorMsg, setErrorMsg] = useState(''); // ERROR MESSAGE
    
    //Loading stuff
    const [isLoading, setLoading] = useState({date: false, roverName: false, searchText: false}); // LOADING OR NOT

    const userSelectedQuery = (e) => {
        e.preventDefault();
        userSelection({...userInput, [e.target.name]: e.target.value})
    };

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

    // ROVER CALL
    // GETTING MAX DAYS SPENT ON MARS by selected rover to PASS that day value into the next API call to get photos
    const findRoverPhotos = (e) => {
        e.preventDefault();

        if (!userInput.roverName) {
            showError(true);
            setErrorMsg('The input is empty.');
            return
        }

        setLoading({ ...isLoading, roverName: true });
        manifestCall().then( (res) => {
            getManifestData({ ...manifestData, [userInput.roverName]: res.data.photo_manifest });
        }).catch((er) => {
            showError(true);
            setErrorMsg(er.message);
        });
    };

    useEffect(() => {
        if (manifestData[userInput.roverName]) {
            roverCall().then((res) => {
                setLoading({ ...isLoading, roverName: false });
                getData({ ...results, roverPhotos: res.data.photos });
            }).catch((error) => {
                setLoading({ ...isLoading, roverName: false });
                showError(true);
                setErrorMsg(error.response.data.errors);
            })
        }
    }, [manifestData[userInput.roverName]]);


    const manifestCall = () => {
        return axios({
            url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${userInput.roverName}/`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            }
        })
    };

    const roverCall = () => {
        return axios({
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${userInput.roverName}/photos`, // need to be dynamic
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                sol: Math.floor(Math.random() * (manifestData[userInput.roverName].max_sol) + 1), // getting a random day out of all days spent by the selected rover on Mars
                //earth_date: `2020-01-16`, // more practical would be to use sol instead of earth_date
            }
        })
    };

    // ADDITIONAL INFO CALL
    const findSpaceInfo = (e) => {
        e.preventDefault();

        // checking if input is empty (no point in making an API call if the input in empty)
        if (!userInput.searchText) {
            showError(true);
            setErrorMsg('The input is empty.');
            return
        } else {
            setLoading({ ...isLoading, searchText: true });
            findSpaceInfoApiCall();
        };
    };

    const findSpaceInfoApiCall = () => {
        axios({
            url: `https://images-api.nasa.gov/search`,
            method: 'GET',
            params: {
                q: userInput.searchText,
                page: currentPage || 1,
            }
        })
        .then((res) => {
            const space = res.data.collection;
            // showing error if there's no results based on the user input
            if (!space.items.length) {
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

    useEffect(() => {
        if (currentPage) {
            findSpaceInfoApiCall();
            window.scrollTo(0, 0);
        };
    }, [currentPage]);
    
    return(
        <UserInput.Provider value={{
            userSelectedQuery: userSelectedQuery,

            userInput: userInput,
            userSelection: userSelection,
            results: results,
            getData: getData,
            manifestData:manifestData,
            getManifestData:getManifestData,
            currentPage:currentPage,
            changePage:changePage,

            isThereError: isThereError,
            showError: showError,
            errorMsg: errorMsg,
            setErrorMsg: setErrorMsg,

            isLoading: isLoading,
            setLoading: setLoading,

            findPhotoDay: findPhotoDay,
            findRoverPhotos: findRoverPhotos,
            findSpaceInfo: findSpaceInfo,

        }}>
            { children }
        </UserInput.Provider>
    )
};