import React, { useEffect, createContext, useContext } from 'react';
import axios from 'axios';

// grabbing every needed component' logic
import { useInput } from '../UserInputResults/UserInputResults';
import { useError } from '../Error/ErrorContext';
import { useLoading } from '../Loading/LoadingContext';

const ApiCallRoverPhotos = createContext();
// Using useDayPhoto will allow us to grab useDayPhoto's content in any file in the App
export const useRoverPhotos = () => {
    return useContext(ApiCallRoverPhotos);
};

// RoverPhotos API call logic functional
export default function RoverPhotosProvider({ children }) {
    // using imported functions from other smart components
    const { userInput: { roverName }, userSelection, userSelectedQuery, results, getData, manifestData, getManifestData } = useInput();
    const { isThereError, showError, errorMsg, setErrorMsg } = useError();
    const { isLoading, setLoading } = useLoading();

    // GETTING MAX DAYS SPENT ON MARS by selected rover to PASS that day value into our next API call to get photos
    const findRoverPhotos = (e) => {
        e.preventDefault();

        if (!roverName) {
            showError(true);
            setErrorMsg('The input is empty.');
            return
        } else if ( manifestData[roverName].hasOwnProperty('name') ) {
            roverCall();
            return
        }

        manifestCall();
    };

    const roverCall = () => {
        console.log(roverName, manifestData[roverName]);
        setLoading({ ...isLoading, roverName: true });
        axios({
            url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${roverName}/photos`, // need to be dynamic
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                sol: Math.floor(Math.random() * (manifestData[roverName].max_sol) + 1), // getting a random day out of all days spent by the selected rover on Mars
                //earth_date: `2020-01-16`, // more practical would be to use sol instead of earth_date
            }
        }).then((res) => {
            console.log(res.data.photos);
            setLoading({ ...isLoading, roverName: false });
            getData({ ...results, roverPhotos: res.data.photos });
        }).catch((error) => {
            setLoading({ ...isLoading, roverName: false });
            showError(true);
            setErrorMsg(error.response.data.errors);
        })
    };


    const manifestCall = async () => {
        setLoading({ ...isLoading, roverName: true });

        await axios({
            url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${roverName}/`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            }
        }).then( (res) => {
            setLoading({ ...isLoading, roverName: false });
            getManifestData({ ...manifestData, [roverName]: res.data.photo_manifest });
        }).catch((er) => {
            setLoading({ ...isLoading, roverName: false });
            showError(true);
            setErrorMsg(er.message);
        });

        roverCall();
    };




    // ROVER PHOTOS CALL
    // useEffect(() => {
    //     if (roverName && manifestData[roverName]) {

    //     }
    // }, [manifestData[roverName]]);

    return(
        <ApiCallRoverPhotos.Provider value={{
            findRoverPhotos: findRoverPhotos,
        }}>
            { children }
        </ApiCallRoverPhotos.Provider>
    )
};