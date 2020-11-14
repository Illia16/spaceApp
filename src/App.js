import React, { useState, useEffect } from 'react';
import "./styles/app.scss";
import BgVideo from './components/Background/BgVideo';
import MainPage from './components/MainPage/MainPage';
import Results from './components/Results/Results';
import Footer from './components/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

// grabbing every needed component' logic
import { useInput } from './components/UserInput/UserInput';
import { useError } from './components/Error/ErrorContext';
import { useLoading } from './components/Loading/LoadingContext';
import { useDayPhoto } from './components/Results/ApiCallDayPhoto';




function App() {  
  // using imported functions from other smart components
  const { userInput, userSelection, userSelectedQuery} = useInput();
  const { isThereError, showError, errorMsg, setErrorMsg } = useError();
  const { isLoading, setLoading } = useLoading();
  const { results, getData, findPhotoDay } = useDayPhoto();



  // GETTING MAX DAYS SPENT ON MARS by selected rover to PASS that day value into our next API call to get photos
  const findRoverPhotos = (e) => {
    e.preventDefault();

    if (!userInput.roverName) {
      showError(true);
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
        showError(true);
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
        showError(true);
        setErrorMsg(error.response.data.errors);
      })
    };
  }, [results.manifestData]);


  // ADDITIONAL INFO
  const findSpaceInfo = (e) => {
    e.preventDefault();

    // checking if input is empty (no point in making an API call if the input in empty)
    if (!userInput.searchText) {
      showError(true);
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
            showError(true);
            setErrorMsg('No results found based on your input.');
          } else {
            setLoading({...isLoading, searchText: false });
            getData({...results, spaceInfo: space});
          }
        })
      .catch( (error) => {
          setLoading({...isLoading, searchText: false });
          showError(true);
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
                isThereError={isThereError}
                showError={showError}
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