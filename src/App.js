import React, { useState, useEffect } from 'react';
import "./styles/app.scss";
import BgVideo from './components/presentational/background/BgVideo';
import MainPage from './components/MainPage/MainPage';
import Results from './components/Results/Results';
import Footer from './components/presentational/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

import { useError } from './components/Error/ErrorContext';

// FUNCTIONS
import SetTodayDate from './components/SetTodayDate';

function App() {
  const [userInput, userSelection] = useState({date: '', roverName: '', searchText: ''}); // USER INPUT
  const [results, getData] = useState({ dayPhoto: [], manifestData: [], roverPhotos: [], spaceInfo: [] }); // RESULTS
  const [isLoading, setLoading] = useState({date: false, roverName: false, searchText: false}); // LOADING OR NOT
  // const [errorPopUp, isThereError] = useState(false); // ERROR T/F
  // const [errorMsg, setErrorMsg] = useState(''); // ERROR MESSAGE
  
  // using Error component in order to handle error
  const { errorPopUp, isThereError, errorMsg, setErrorMsg } = useError();
  console.log(errorPopUp);


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
                date: userInput.date || SetTodayDate(),
            }
        }).then( (res) => {
            setLoading({...isLoading, date: false });
            getData({...results, dayPhoto: res.data})

            userSelection({...userInput, date: res.data.date})

          }).catch( error => {
            setLoading({...isLoading, date: false });
            isThereError(true);
            setErrorMsg(error.response.data.msg)
        })
  };

  // GETTING MAX DAYS SPENT ON MARS by selected rover to PASS that day value into our next API call to get photos
  const findRoverPhotos = (e) => {
    e.preventDefault();

    if (!userInput.roverName) {
      isThereError(true);
      setErrorMsg('The input is empty.');
      return
    } else {
      setLoading({...isLoading, roverName: true });

      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${userInput.roverName}/`,
        method: 'GET',
        params: {
          api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
        }
      }).then( (res) => {
        setLoading({...isLoading, roverName: false });
        getData({...results, manifestData: res.data.photo_manifest});
      }).catch( (er) => {
        setLoading({...isLoading, roverName: false });
        isThereError(true);
        setErrorMsg(er.message);
      });
    }
  };


  // ROVER PHOTOS CALL
  useEffect( () => {
    if (userInput.roverName && results.manifestData) {
      setLoading({...isLoading, roverName: true });
      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${userInput.roverName}/photos`, // need to be dynamic
        method: 'GET',
        params: {
            api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            sol: Math.floor(Math.random()*(results.manifestData.max_sol)+1), // getting a random day out of all days spent by the selected rover on Mars
            //earth_date: `2020-01-16`, // more practical would be to use sol instead of earth_date
        }
      }).then( (res) => {
        setLoading({...isLoading, roverName: false });
        getData({...results, roverPhotos: res.data.photos});
      }).catch( (error) => {
        setLoading({...isLoading, roverName: false });
        isThereError(true);
        setErrorMsg(error.response.data.errors);
      })
    };
  }, [results.manifestData]);


  // ADDITIONAL INFO
  const findSpaceInfo = (e) => {
    e.preventDefault();

    // checking if input is empty (no point in making an API call if the input in empty)
    if (!userInput.searchText) {
      isThereError(true);
      setErrorMsg('The input is empty.');
      return
    } else {
      setLoading({...isLoading, searchText: true });
      axios({
          url: `https://images-api.nasa.gov/search`,
          method: 'GET',
          params: {
              q: userInput.searchText,
              page: 1,
          }
        })
      .then( (res) => {
          const space = res.data.collection.items;
          // showing error if there's no results based on the user input
          if (!space.length) {
            setLoading({...isLoading, searchText: false });
            isThereError(true);
            setErrorMsg('No results found based on your input.');
          } else {
            setLoading({...isLoading, searchText: false });
            getData({...results, spaceInfo: space});
          }
        })
      .catch( (error) => {
          setLoading({...isLoading, searchText: false });
          isThereError(true);
          setErrorMsg(error.response.data.reason);
        })
    };
  };

  return (
      <Router basename={process.env.PUBLIC_URL}>
          <BgVideo />
          <div className="App wrapper">
            <Route exact path="/">
              <MainPage
                errorPopUp={errorPopUp}
                closeWindow={isThereError}
                errorMsg={errorMsg}

                isLoading={isLoading}
                userInput={userInput}
                userSelectedQuery={userSelectedQuery}
                findPhotoDay={findPhotoDay}
                results={results}

                findRoverPhotos={findRoverPhotos}
                findSpaceInfo={findSpaceInfo}
                />
            </Route>
            
            <Results results={results} />
          </div>
          < Footer />
      </Router>
  );
};

export default App;