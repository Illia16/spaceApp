import React, { Component } from 'react'
import "./styles/app.scss";
import Error from './Error';
import BgVideo from './BgVideo';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
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


  findPhotoDay = (e) => {
    e.preventDefault();

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

  findRoverPhotos = async (e) => {
    e.preventDefault();
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

  findSpaceInfo = (e) => {
    e.preventDefault();
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
      if (!spaceInfo.length) { 
        this.setState({ errorPopUp: true, loadingStatus: {...this.state.loadingStatus, spaceInfo: false}, }) 
      } else {
        this.gettingResults('spaceInfo', spaceInfo);
      }
    }).catch( (error) => {
      this.handingError('emptyInput', error.response.data.reason, 'spaceInfo');  
    })
  }


  userSelection = (e) => {
    // saving data in stated based on the input used
    console.log(e.target.name, e.target.value);
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

  Nav = () => {
    return(
        <div>          
              <header>
                <h1>Explore Space</h1>
              </header>

              {
                this.state.errorPopUp ? <Error states={this.state} closeWindow={this.closeError} /> : null
              }

    {/* LOOKING FOR PHOTO OF THE DAY */}
              <section>
                <h2>Photo of the day</h2>
                <p>Select a desired date. If date is not selected, by default today's date is set. The result shows up the title of the photo of the selected date, author name, description and the photo as well.</p>

                <form action="">
                  <div className="dayPhoto">
                    <label htmlFor="date" className="srOnly">Pick a date</label>
                    <input onChange={this.userSelection} type="date" id="date" name="date" placeholder="e.g.: 2020-07-11"/>

                    <button onClick={this.findPhotoDay}>SEARCH</button>

                    {/* SHOW RESULTS ONCE WE GET THEM */}
                    {
                      (this.state.resultsReady.dayPhoto && !this.state.loadingStatus.dayPhoto)
                      ? <NavLink to="/photos/photooftheday" className="resultsLink">SEE RESULTS</NavLink>
                      : null
                    }

                    {/* WAITING LOGO WHILE GETTING THE RESULTS */}
                    {
                      this.state.loadingStatus.dayPhoto
                      ? 
                      <div className="loadingLogo">
                        <p>Loading</p>
                        <div aria-hidden="true">
                          <div className="line" aria-hidden="true"></div>
                          <div className="line" aria-hidden="true"></div>
                          <div className="line" aria-hidden="true"></div>
                        </div>
                      </div>
                      : null
                    }
                  </div>
                </form>


              </section>

    {/* LOOKING FOR ROVER PHOTOS */}
              <section>
                <h2>Mars Rover photos</h2>
                <p>Select a rover. The result shows up photos taken by a selected rover on one of the days, information about rover; when it left Earth, landed on Mars, how many photos took(taken if still operates) as well as when the last photos were taken.</p>

                <form action="">
                  <div className="roverPhotos">
                    <label htmlFor="rover" className="srOnly">Select a rover</label>

                    <select onChange={ this.userSelection } type="rover" id="rover" name="roverName">
                      <option name="roverName" value="">Pick a Mars rover</option>
                      <option name="roverName" value="spirit">Spirit</option>
                      <option name="roverName" value="opportunity">Opportunity</option>
                      <option name="roverName" value="curiosity">Curiosity</option>
                    </select>

                    <button onClick={this.findRoverPhotos}>FIND</button>

                    {
                      (this.state.resultsReady.roverPhotos && !this.state.loadingStatus.roverPhotos)
                      ?<NavLink to="/photos/roverPhotos" className="resultsLink">SEE RESULTS</NavLink>
                      : null
                    }

                    {
                      this.state.loadingStatus.roverPhotos
                      ? 
                      <div className="loadingLogo">
                        <p>Loading</p>
                        <div aria-hidden="true">
                          <div className="line" aria-hidden="true"></div>
                          <div className="line" aria-hidden="true"></div>
                          <div className="line" aria-hidden="true"></div>
                        </div>
                      </div>
                      : null
                    }
                  </div>
                </form>
              </section>

    {/* LOOKING FOR ADDITIONAL SPACE INFO */}
              <section>
                <h2>Space information</h2>
                <p>Search space information based on the search input. The result shows up a list of items based on user requets. The list includes title of the event, its photo and description.</p>

                <form action="">
                  <div className="spaceInfo">
                    <label htmlFor="text" className="srOnly">Input your search query</label>
                    <input onChange={this.userSelection} type="text" name="searchText" id="text" placeholder="e.g. Nebulae"/>
                    
                    <button onClick={this.findSpaceInfo}>FIND</button>

                    {
                    (this.state.resultsReady.spaceInfo && !this.state.loadingStatus.spaceInfo)
                    ? <NavLink to="/photos/spaceInfo" className="resultsLink">SEE RESULTS</NavLink>
                    
                    : null
                    }

                    {
                    this.state.loadingStatus.spaceInfo
                    ?
                    <div className="loadingLogo">
                      <p>Loading</p>
                      <div aria-hidden="true">
                        <div className="line" aria-hidden="true"></div>
                        <div className="line" aria-hidden="true"></div>
                        <div className="line" aria-hidden="true"></div>
                      </div>
                    </div>
                    : null
                    }
                  </div>
                </form>
              </section>
        </div>
    )
  }

  Footer = () => {
    return (
      <footer>
        <p>2020 Made by Illia Nikitin</p> 
        <a href="https://github.com/Illia16" className="github" target="_blank" aria-label="github icon for Illia's profile"><i className="fab fa-github" aria-hidden="true"></i></a>
        <a href="https://www.linkedin.com/in/illia-nikitin-a4a637122/" className="linkedin" target="_blank" aria-label="linkedin icon for Illia's profile"><i className="fab fa-linkedin" aria-hidden="true"></i></a>
      </footer>
    )
  }


  // 3 result components: dayPhoto, roverPhotos, spaceInfo
  dayPhoto = () => {
    const {title, url, copyright, date, explanation} = this.state.dayPhoto;

    return(
        <div className="dayPhotoRes">
            <h3>{title}</h3>
            {this.state.dayPhoto.hasOwnProperty("copyright") ? <p>Photo of the day <span>{date}</span> by {copyright}</p> : <p>Photo of the day <span>{date}</span> by unknown author</p> }
            <p>{explanation}</p>
            <div>
              <img src={url} alt={title}/>
            </div>

            <div className="seeResLink">
              <NavLink to={`/`} className="goBackLink">GO BACK</NavLink>
            </div>
        </div>
    )
  }

  RoverPhotos = () => {
    const [{earth_date: earthDate, rover:{landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus}}] = this.state.roverPhotos

    const {max_date, total_photos} = this.state.manifestData

    return(
      <div className="roverPhotosRes">
        <h3>{roverName} rover photos </h3>
        <p>Photos taken on <span>{earthDate}</span></p>
        <p>Left Earth <span>{launchDate}</span></p>
        <p>Landed on Mars <span>{landingDate}</span></p>
        <p>Total photos taken <span>{total_photos}</span></p>
        <p>The last photos taken on <span>{max_date}</span></p>
        <p>Status <span>{roverStatus}</span></p>

        <ul className="roverPhotos">
          {
            this.state.roverPhotos.map( (obj) => {
              return(
                <li key={obj.id}><img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`}/></li>
              )
            })
          }
        </ul>
        <div className="seeResLink">
          <NavLink to={`/`} className="goBackLink">GO BACK</NavLink>
        </div>
      </div>
    )
  }

  SpaceInfo = () => {
    return(
      <div>
        <h3>Space Information</h3>

        <ul className="spaceInfoRes">
          {
            this.state.spaceInfo.slice(0, 20).map( (obj) => {
              console.log(obj);
              console.log(obj.hasOwnProperty('links'));

              return(
                <li key={obj.data[0].nasa_id}>
                  <h4>{obj.data[0].title}</h4>
                  {
                    obj.hasOwnProperty('links') ? <div className="imgParent"><img src={obj.links[0].href} alt={`${obj.data[0].title}`}/></div> : null
                  }
                  <p>{obj.data[0].description}</p>
                  </li>
              )
            })
          }
        </ul>
        <div className="seeResLink">
          <NavLink to={`/`} className="goBackLink">GO BACK</NavLink>
        </div>
      </div>
    )
  }
  

  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <BgVideo />

        <div className="App wrapper">
          <Route exact path="/" component={ this.Nav } />

          {/* <Route exact path="/photos" component={ this.Photos } /> */}
          <Route exact path="/photos/photooftheday" component={this.dayPhoto} />
          <Route exact path="/photos/roverPhotos" component={ this.RoverPhotos } />
          <Route exact path="/photos/spaceInfo" component={ this.SpaceInfo } />
        </div>

        <Route exact path="/" component={ this.Footer } />
      </Router>
    );
  }
}

export default App;