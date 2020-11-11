import React, { useState, useEffect } from 'react';
import "./styles/app.scss";
import BgVideo from './components/presentational/background/BgVideo';
import MainPage from './components/MainPage/MainPage';
// import Results from './components/Results/Results';
import Footer from './components/presentational/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';

function App() {
  
  // USER INPUT
  const [userInput, userSelection] = useState({date: '', roverName: '', searchText: ''});
  
  // RESULTS
  const [results, getData] = useState({ dayPhoto: [], manifestData: [], roverPhotos: [], spaceInfo: [] });

  // LOADING OR NOT
  const [isLoading, setLoading] = useState({date: false, roverName: false, searchText: false});
  
  // ERROR T/F
  const [errorPopUp, isThereError] = useState(false);

  // ERROR MESSAGE
  const [errorMsg, setErrorMsg] = useState('');
  



  const userChoice = (e) => {
    e.preventDefault();
    userSelection({...userInput, [e.target.name]: e.target.value})
  };

  const setTodayDate = () => {
    const today = new Date();
    const dateArr = [today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')];
    const todayRes = dateArr.join('-');
    userSelection({...userInput, date: todayRes});
  };


  // const closeError = () => {
  //   isThereError(false);
  //   setErrorMsg('')
  // };
  

  // APOD CALL
  useEffect( () => {
    if (userInput.date) {
        // setting today's date if no date is picked by user
        !userInput.date && setTodayDate()
        setLoading({...isLoading, date: true });
        axios({
            url: `https://api.nasa.gov/planetary/apod`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                date: userInput.date,
            }
        }).then( (res) => {
            setLoading({...isLoading, date: false });
            getData({...results, dayPhoto: res.data})
          }).catch( error => {
            isThereError(true);
            setErrorMsg(error.response.data.msg)
        })
    };
  }, [userInput.date]);

  // waiting for MAX DAYS SPENT ON MARS by selected rover to PASS that day value into next API call to get photos
  useEffect( () => {
    if (userInput.roverName) {
      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${userInput.roverName}/`,
        method: 'GET',
        params: {
            api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
        }
      }).then( (res) => {
        getData({...results, manifestData: res.data.photo_manifest});
      }).catch( (er) => {
        isThereError(true);
        setErrorMsg(er.message);
      });
    }
  }, [userInput.roverName]);


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
        isThereError(true);
        setErrorMsg(error.response.data.errors);
      })
    };
  }, [userInput.roverName, results.manifestData]);


  // ADDITIONAL INFO
  useEffect( () => {
    if (userInput.searchText) {
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
          console.log(res);
          const space = res.data.collection.items;
          // showing error if there's no results based on the user input
          if (!space.length) {
            setLoading({...isLoading, searchText: false });
            isThereError(true);
          } else {
            setLoading({...isLoading, searchText: false });
            getData({...results, spaceInfo: space});
          }
        })
      .catch( (error) => {
          isThereError(true);
          setErrorMsg(error.response.data.reason);
        })
    };
  }, [userInput.searchText]);

  return (
      <Router basename={process.env.PUBLIC_URL}>
          <BgVideo />
          <div className="App wrapper">
            <Route exact path="/">
              <MainPage
                errorPopUp={errorPopUp}
                closeWindow={isThereError}
                errorMsg={errorMsg}

                results={results}
                userSelection={userChoice}
                isLoading={isLoading}
                // findPhotoDay={this.findPhotoDay}
                // findRoverPhotos={this.findRoverPhotos}
                // findSpaceInfo={this.findSpaceInfo}
                />
            </Route>
            
            {/* <Results states={this.state} /> */}
          </div>
          < Footer />
      </Router>



    // <div>
    //   <div className="dayPhoto">
    //       <label htmlFor="date" className="srOnly">Pick a date</label>
    //       <input onChange={userChoice} type="date" id="date" name="date" placeholder="e.g.: 2020-07-11" value={userInput.date}/>
    //   </div>

    //   <div className="roverPhotos">
    //     <label htmlFor="rover" className="srOnly">Select a rover</label>

    //     <select onChange={ userChoice } type="rover" id="rover" name="roverName" value={userInput.roverName}>
    //         <option name="roverName" value="">Pick a Mars rover</option>
    //         <option name="roverName" value="spirit">Spirit</option>
    //         <option name="roverName" value="opportunity">Opportunity</option>
    //         <option name="roverName" value="curiosity">Curiosity</option>
    //     </select>
    //   </div>

    //   <div className="spaceInfo">
    //     <label htmlFor="text" className="srOnly">Input your search query</label>
    //     <input onChange={userChoice} type="text" name="searchText" id="text" value={userInput.searchText} placeholder="e.g. Nebulae"/>
    //   </div>
    // </div>
  );
};

export default App;