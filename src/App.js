import React, { Component } from 'react'
import "./styles/app.scss";
import Error from './Error';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
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
      }
  }

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


  findPhotoDay = () => {

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

// Curiosity landed on: 2012-08-06 - 2870 days spent
// Opportunity landed on: 2004-01-25 - 5111 days spent
// Spirit landed on: 2004-01-04 - 2208 days spent

  findRoverPhotos = async () => {
      this.loadingStatus('roverPhotos');

      // checking if one of the rovers is selected
      if (!this.state.roverName) {
        this.handingError('noRover', 'Please, select a rover', 'roverPhotos');

        // exiting the fucntion
        return
      };

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
        }).catch( (er) => { console.log(er); });
        
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

  findSpaceInfo = () => {
    this.loadingStatus('spaceInfo');

    axios({
      url: `https://images-api.nasa.gov/search`,
      method: 'GET',
      params: {
          q: this.state.searchText,
      }
    }).then( (res) => {
      const spaceInfo = res.data.collection.items;

      // showing error if there's no results based on the user input
      if (!spaceInfo.length) { this.setState({ errorPopUp: true }) };

      this.gettingResults('spaceInfo', spaceInfo);

    }).catch( (error) => {
      this.handingError('emptyInput', error.response.data.reason, 'spaceInfo');  
    })
  }


  userSelection = (e) => {
    // saving data in stated based on the input used
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,

    // hiding "See results" upon change of any input
      resultsReady: {
        dayPhoto: false,
        roverPhotos: false,
        spaceInfo: false,
      }
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

  Nav = () => {
    return(
        <div>          
              <header>
                <h1>Space App</h1>
              </header>
              {/* <Link to={`/photos`}><p>photos</p></Link> */}

              {
                this.state.errorPopUp ? <Error states={this.state} closeWindow={this.closeError} /> : null
              }

    {/* LOOKING FOR PHOTO OF THE DAY */}
              <section className="dayPhoto">

                <form action="">
                  <label htmlFor="date"></label>
                  <input onChange={this.userSelection} type="date" id="date" name="date" />

                  {/*defaultValue="2020-09-02" */}
                </form>

                <button onClick={this.findPhotoDay}>Find photo of the day</button>
                
                {/* SHOW RESULTS ONCE WE GET THEM */}
                {
                this.state.resultsReady.dayPhoto 
                ? <Link to="/photos/photooftheday" style={{ padding: '10px' }}>See results</Link>
                : null
                }

                {/* WAITING LOGO WHILE GETTING THE RESULTS */}
                {
                  this.state.loadingStatus.dayPhoto
                  ? <div className="waitingClock"><img src={require("./img/sandClock.png")} alt="loading results logo"/></div> 
                  : null
                }
              </section>

    {/* LOOKING FOR ROVER PHOTOS */}
              <section className="roverPhotos">

                <form action="">
                  <label htmlFor="rover" className="srOnly"></label>

                  <select onChange={ this.userSelection } type="rover" id="rover" name="roverName">
                    <option name="roverName" value="">Pick a Mars rover</option>
                    <option name="roverName" value="spirit">Spirit</option>
                    <option name="roverName" value="opportunity">Opportunity</option>
                    <option name="roverName" value="curiosity">Curiosity</option>
                  </select>
                </form>
                
                <button onClick={this.findRoverPhotos}>Find rover photos</button>

                {
                this.state.resultsReady.roverPhotos 
                ? <Link to="/photos/roverPhotos"  style={{ padding: '10px' }}>See results</Link>
                : null
                }

                {
                  this.state.loadingStatus.roverPhotos
                  ? <div className="waitingClock"><img src={require("./img/sandClock.png")} alt="loading results logo"/></div> 
                  : null
                }
              </section>

    {/* LOOKING FOR ADDITIONAL SPACE INFO */}
              <section className="spaceInfo">

                <form action="">
                  <label htmlFor="text"></label>
                  <input onChange={this.userSelection} type="text" name="searchText" id="text" />
                </form>
                
                <button onClick={this.findSpaceInfo}>Find additional space info</button>

                {
                  this.state.resultsReady.spaceInfo 
                  ? <Link to="/photos/spaceInfo"  style={{ padding: '10px' }}>See results</Link>
                  : null
                }

                {
                  this.state.loadingStatus.spaceInfo
                  ? <div className="waitingClock"><img src={require("./img/sandClock.png")} alt="loading results logo"/></div> 
                  : null
                }
              </section>
        </div>
    )
  }

  // Photos = () => {
  //   return(
  //       <div>
  //         <Link to={`/`}>Go home</Link>
  //       </div>
  //   )
  // }

  // 3 result components: dayPhoto, roverPhotos, spaceInfo
  dayPhoto = () => {
    const {title, url, copyright, explanation} = this.state.dayPhoto;
    return(
        <div>
            <Link to={`/`}>Go back</Link>
            <h2>{title} by {copyright}</h2>
            <p>{explanation}</p>
            <div>
              <img src={url} alt={title}/>
            </div>
        </div>
    )
  }

  RoverPhotos = () => {
    const [{earth_date: earthDate, rover:{landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus}}] = this.state.roverPhotos

    const {max_date, total_photos} = this.state.manifestData

    return(
      <div>
        <Link to={`/`}>Go back</Link>
        <h2>The photos of {roverName} rover taken on {earthDate} </h2>
        <p>Left Earth: {launchDate}</p>
        <p>Landed on Mars: {landingDate}</p>
        <p>Status: {roverStatus}</p>
        <p>Total photos taken: {total_photos}</p>
        <p>The last photos taken on: {max_date}</p>

        <ul className="roverPhotos">
          {
            this.state.roverPhotos.map( (obj) => {
              return(
                <li key={obj.id}><img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`}/></li>
              )
            })
          }
        </ul>
      </div>
    )
  }

  SpaceInfo = () => {
    return(
      <div>
        <h2>Space Info</h2>
        <Link to={`/`}>Go back</Link>

        <ul className="spaceInfo">
          {
            this.state.spaceInfo.slice(0, 20).map( (obj) => {
              console.log(obj);
              console.log(obj.hasOwnProperty('links'));

              return(
                <li key={obj.data[0].nasa_id}>
                  <h3>{obj.data[0].title}</h3>
                  {
                    obj.hasOwnProperty('links') ? <img src={obj.links[0].href} alt={`${obj.data[0].title}`}/> : null
                  }
                  <p>{obj.data[0].description}</p>
                  </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
  


  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div className="App wrapper">
          <Route exact path="/" component={ this.Nav } />

          {/* <Route exact path="/photos" component={ this.Photos } /> */}
          <Route exact path="/photos/photooftheday" component={this.dayPhoto} />
          <Route exact path="/photos/roverPhotos" component={ this.RoverPhotos } />
          <Route exact path="/photos/spaceInfo" component={ this.SpaceInfo } />
        </div>
      </Router>
    );
  }
}

export default App;