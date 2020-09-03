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
          dayPhoto: [],
          roverPhotos: [],
          spaceInfo: [],
          errorPopUp: false,
          errorMsg: {
            badDate: "",
            noRover: "",
            emptyInput: "",
            noData: "No data found based on your request",
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


  // componentDidMount() {
  //     this.setState({
  //       date: 
  //     })
  //     // making sure user can't pick a day beyond today's date
  //     date.max = new Date().toISOString().split("T")[0];
  // }


  findPhotoDay = () => {

    // if (!this.state.date) {
    //   this.setState({
    //     errorPopUp: true,
    //   })
    // } else {

          this.setState({
            loadingStatus: {
              ...this.state.loadingStatus,
              dayPhoto: true,
            }
          })

          axios({
            url: `https://api.nasa.gov/planetary/apod`,
            method: 'GET',
            params: {
                api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
                date: this.state.date,
            }
        }).then( (res) => {
            console.log(res);
            console.log(res.data);

            const photoOfTheDay = res.data;

            this.setState({
                dayPhoto: photoOfTheDay,
                loadingStatus: {
                  ...this.state.loadingStatus,
                  dayPhoto: false,
                },
                resultsReady: {
                  ...this.state.resultsReady,
                  dayPhoto: true,
                }
            })
        }).catch( error => {
          this.setState({
            errorMsg: {
              ...this.state.errorMsg,
              badDate: error.response.data.msg,
            },
            errorPopUp: true,
            loadingStatus: {
              ...this.state.loadingStatus,
              dayPhoto: false,
            }
          })
        })
    //}
}

  findRoverPhotos = () => {

      this.setState({
        loadingStatus: {
          ...this.state.loadingStatus,
          roverPhotos: true,
        }
      })
    
      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverName}/photos`, // need to be dynamic
        method: 'GET',
        params: {
            api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            earth_date: `2020-01-16`, // need to be dynamic
        }
    }).then( (res) => {
        console.log(res);

        const roverPhotos = res.data.photos;

        this.setState({
          roverPhotos: roverPhotos,
          loadingStatus: {
            ...this.state.loadingStatus,
            roverPhotos: false,
          },
          resultsReady: {
            ...this.state.resultsReady,
            roverPhotos: true,
          }
        })
    }).catch( (error) => {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          noRover: error.response.data.errors,
        },
        errorPopUp: true,
        loadingStatus: {
          ...this.state.loadingStatus,
          roverPhotos: false,
        }
      })    
    })
  }

  findSpaceInfo = () => {

    this.setState({
      loadingStatus: {
        ...this.state.loadingStatus,
        spaceInfo: true,
      }
    })

    axios({
      url: `https://images-api.nasa.gov/search`,
      method: 'GET',
      params: {
          q: this.state.searchText,
      }
    }).then( (res) => {
      console.log(res.data.collection.items);

      const spaceInfo = res.data.collection.items;

      this.setState({
        spaceInfo: spaceInfo,
        loadingStatus: {
          ...this.state.loadingStatus,
          spaceInfo: false,
        },
        resultsReady: {
          ...this.state.resultsReady,
          spaceInfo: true,
        }
      })
    }).catch( (error) => {
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          emptyInput: error.response.data.reason,
        },
        errorPopUp: true,
        loadingStatus: {
          ...this.state.loadingStatus,
          spaceInfo: false,
        }
      })  
    })

  }

  userSelection = (e) => {
    console.log(e.target.name, e.target.value);
    this.setState({
      [e.target.name]: e.target.value,
      resultsReady: {
        dayPhoto: false,
        roverPhotos: false,
        spaceInfo: false,
      }
    })
  }

  closeError = () => {
    this.setState({
        errorPopUp: false,
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
    console.log(earthDate, landingDate, launchDate, roverName, roverStatus);

    return(
      <div>
        <Link to={`/`}>Go back</Link>
        <h2>The photos of {roverName} rover </h2>
        <p>Launched from Earth: {launchDate}</p>
        <p>Landed on Mars: {landingDate}</p>
        <p>Status: {roverStatus}</p>

        <ul className="roverPhotos">
          {
            this.state.roverPhotos.map( (obj) => {
              console.log(obj);
              return(
                <li key={obj.id}><img src={obj.img_src} alt={`rover photo ${obj.earth_date}`}/></li>
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
              return(
                <li key={obj.data[0].nasa_id}>
                  <h3>{obj.data[0].title}</h3>
                  <img src={obj.links[0].href} alt={`rover photo ${obj.data[0].title}`}/>
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
        <div className="App">
          <Route exact path="/" component={ this.Nav } />

          <Route exact path="/photos" component={ this.Photos } />
          <Route exact path="/photos/photooftheday" component={this.dayPhoto} />
          <Route exact path="/photos/roverPhotos" component={ this.RoverPhotos } />
          <Route exact path="/photos/spaceInfo" component={ this.SpaceInfo } />
        </div>
      </Router>
    );
  }
}

export default App;
