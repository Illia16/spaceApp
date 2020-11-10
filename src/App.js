import React, { Component } from 'react';
import "./styles/app.scss";
import BgVideo from './components/presentational/background/BgVideo';
import MainPage from './components/MainPage/MainPage';
import Results from './components/Results/Results';
import Footer from './components/presentational/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios';


class App extends Component {
  constructor() {
    super();
    this.state = {
        date: "",
        searchText: "",
        roverName: "",
        manifestData: [],
        dayPhoto: [],
        roverPhotos: [],
        spaceInfo: [],
        errorPopUp: false,
        errorMsg: {
          badDate: "",
          noRover: "",
          emptyInput: "",
          noData: "No data found based on the search request",
        },
        loadingStatus: {
          dayPhoto: false,
          roverPhotos: false,
          spaceInfo: false,
        },
        resultsReady: {
          dayPhoto: false,
          roverPhotos: false,
          spaceInfo: false,
        }
    };
  };

  // loading logo while getting results ON
  loadingStatus = (loadOn) => {
    this.setState({
      loadingStatus: {
        ...this.state.loadingStatus,
        [loadOn]: true,
      }
    })
  }

  // saving results + loading status OFF + turning ON the results link 
  gettingResults = (what, result) => {
    // saving results in states
    this.setState({
      [what]: result,
      // loading logo while getting results OFF
      loadingStatus: {
        ...this.state.loadingStatus,
        [what]: false,
      },
      // showing "See results" link once we get the data
      resultsReady: {
        ...this.state.resultsReady,
        [what]: true,
      }
    })
  }

  // If there's any error: showing error msg from API + popping up error window with responsive error msg + turining OFF loading status 
  handingError = (typeOfError, errorText, what) => {
    // getting error msg from API to later pass as a prop to Error component
    this.setState({
      errorMsg: {
        ...this.state.errorMsg,
        [typeOfError]: errorText,
      },
      // Error window pop-up ON
      errorPopUp: true,
      // loading logo while getting results OFF
      loadingStatus: {
        ...this.state.loadingStatus,
        [what]: false,
      }
    })
  }

  setTodayDate = ()  => {
    const today = new Date();
    const dateArr = [today.getFullYear(), String(today.getMonth()+1).padStart(2, '0'), String(today.getDate()).padStart(2, '0')];
    const todayRes = dateArr.join('-');
    this.setState({ date: todayRes});
  }

  findPhotoDay = async (e) => {
    e.preventDefault();
    // setting today's date if no date is picked by user
    !this.state.date && await this.setTodayDate()
    this.loadingStatus('dayPhoto');
    axios({
        url: `https://api.nasa.gov/planetary/apod`,
        method: 'GET',
        params: {
            api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            date: this.state.date,
        }
    }).then( (res) => {
        const photoOfTheDay = res.data;
        this.gettingResults('dayPhoto', photoOfTheDay);
    }).catch( error => {
      this.handingError('badDate', error.response.data.msg, 'dayPhoto');
    })
  }

  findRoverPhotos = async (e) => {
    e.preventDefault();
    this.loadingStatus('roverPhotos');
    // checking if one of the rovers is selected
    if (!this.state.roverName) {
      this.handingError('noRover', 'Please, select a rover', 'roverPhotos');
      // exiting the fucntion
      return
    } else {
        // waiting for MAX DAYS SPENT ON MARS by selected rover to PASS that day value into next API call to get photos
          await axios({
            url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${this.state.roverName}/`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            }
        }).then( (res) => {
            this.setState({
              manifestData: res.data.photo_manifest
            })
          }).catch( (er) => {
            this.handingError('noRover', er.message, 'roverPhotos');
          });
          // if the above call is succesfull, then get our data,
          this.state.manifestData &&
            axios({
              url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverName}/photos`, // need to be dynamic
              method: 'GET',
              params: {
                  api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                  sol: Math.floor(Math.random()*(this.state.manifestData.max_sol)+1), // getting a random day out of all days spent by the selected rover on Mars
                  //earth_date: `2020-01-16`, // more practical would be to use sol instead of earth_date
              }
            }).then( (res) => {
              const roverPhotos = res.data.photos;
              this.gettingResults('roverPhotos', roverPhotos);
            }).catch( (error) => {
            this.handingError('noRover', error.response.data.errors, 'roverPhotos');
            })
    }
  }

  findSpaceInfo = (e) => {
    e.preventDefault();
    this.loadingStatus('spaceInfo');
    // checking if input is empty (no point in making an API call if the input in empty)
    if (!this.state.searchText) {
      this.handingError('emptyInput', 'The input is empty. Please, enter a keyword.', 'spaceInfo');
      return
    } else {
        axios({
          url: `https://images-api.nasa.gov/search`,
          method: 'GET',
          params: {
              q: this.state.searchText,
              page: 1,
          }
        }).then( (res) => {
          const spaceInfo = res.data.collection.items;
          // showing error if there's no results based on the user input
          if (!spaceInfo.length) {
            this.setState({ 
              errorPopUp: true,
              loadingStatus: {...this.state.loadingStatus, spaceInfo: false},
            })
          } else {
            this.gettingResults('spaceInfo', spaceInfo);
          }
        }).catch( (error) => {
          this.handingError('emptyInput', error.response.data.reason, 'spaceInfo');  
        })
    }
  }

  userSelection = (e) => {
    e.preventDefault()
    // saving data in stated based on the input used
    this.setState({
      [e.target.name]: e.target.value,
    })
  }

  closeError = () => {
  // closing error window
    this.setState({
      errorPopUp: false,
  // emptying error msg-es so that don't see them together if other error occurs
      errorMsg: {
        ...this.state.errorMsg,
        badDate: "",
        noRover: "",
        emptyInput: "",
      },
    });
  };

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <BgVideo />
        <div className="App wrapper">
          <Route exact path="/">
            <MainPage
              states={this.state} 
              closeWindow={this.closeError}
              userSelection={this.userSelection}
              findPhotoDay={this.findPhotoDay}
              findRoverPhotos={this.findRoverPhotos}
              findSpaceInfo={this.findSpaceInfo}
            />
          </Route>

          <Results states={this.state} />
        </div>
        < Footer />
      </Router>
    );
  }
};

export default App;