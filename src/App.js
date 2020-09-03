import React, { Component } from 'react'
import "./styles/app.scss";
import Error from './Error';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

// THINGS TO DO:
//  - set the dates automatically for every rover's activity on Mars
//  - pop up error if there's NO RESULTS AT all based on the input
class App extends Component {
    constructor() {
      super();
      this.state = {
          date: "",
          searchText: "",
          roverName: "",
          // manifestData: {
          //   spirit: [],
          //   opportunity: [],
          //   curiosity: [],
          // },
          manifestData: [],
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




  findPhotoDay = () => {

    // loading logo while getting results ON
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

      // saving results in states
            this.setState({
                dayPhoto: photoOfTheDay,
      // loading logo while getting results OFF
                loadingStatus: {
                  ...this.state.loadingStatus,
                  dayPhoto: false,
                },
      // showing "See results" link once we get the data
                resultsReady: {
                  ...this.state.resultsReady,
                  dayPhoto: true,
                }
            })
        }).catch( error => {
          // getting error msg from API to later pass as a prop to Error component
          this.setState({
            errorMsg: {
              ...this.state.errorMsg,
              badDate: error.response.data.msg,
            },
            // Error window pop-up ON
            errorPopUp: true,
            // loading logo while getting results OFF
            loadingStatus: {
              ...this.state.loadingStatus,
              dayPhoto: false,
            }
          })
        })
  }

// Curiosity landed on: 2012-08-06 - 2870
// Opportunity landed on: 2004-01-25 - 5111
// Spirit landed on: 2004-01-04 - 2208

  findRoverPhotos = async () => {

      // loading logo while getting results ON
      this.setState({
        loadingStatus: {
          ...this.state.loadingStatus,
          roverPhotos: true,
        }
      })

        await axios({
          url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${this.state.roverName}/`,
          method: 'GET',
          params: {
              api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
          }
      }).then( (res) => {
          console.log(res.data.photo_manifest);

          this.setState({
            manifestData: res.data.photo_manifest
          })
        })
      //}
    
      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/${this.state.roverName}/photos`, // need to be dynamic
        method: 'GET',
        params: {
            api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
            sol: Math.floor(Math.random()*(this.state.manifestData.max_sol)+1),
            //earth_date: `2020-01-16`, // more practical would be to use sol instead of earth_date
        }
    }).then( (res) => {
        console.log(res);
        const roverPhotos = res.data.photos;

      // saving results in states
        this.setState({
          roverPhotos: roverPhotos,
      // loading logo while getting results OFF
          loadingStatus: {
            ...this.state.loadingStatus,
            roverPhotos: false,
      // showing "See results" link once we get the data
          },
          resultsReady: {
            ...this.state.resultsReady,
            roverPhotos: true,
          }
        })
    }).catch( (error) => {
      // getting error msg from API to later pass as a prop to Error component
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          noRover: error.response.data.errors,
        },
        // Error window pop-up ON
        errorPopUp: true,
        // loading logo while getting results OFF
        loadingStatus: {
          ...this.state.loadingStatus,
          roverPhotos: false,
        }
      })    
    })
  }

  findSpaceInfo = () => {
    
    // loading logo while getting results ON
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

    // saving results in states
      this.setState({
        spaceInfo: spaceInfo,
    // loading logo while getting results OFF
        loadingStatus: {
          ...this.state.loadingStatus,
          spaceInfo: false,
        },
    // showing "See results" link once we get the data
        resultsReady: {
          ...this.state.resultsReady,
          spaceInfo: true,
        }
      })
    }).catch( (error) => {
    // getting error msg from API to later pass as a prop to Error component
      this.setState({
        errorMsg: {
          ...this.state.errorMsg,
          emptyInput: error.response.data.reason,
        },
    // Error window pop-up ON
        errorPopUp: true,
    // loading logo while getting results OFF
        loadingStatus: {
          ...this.state.loadingStatus,
          spaceInfo: false,
        }
      })  
    })

  }

  // componentDidMount() {
  //     axios({
  //       url: `https://api.nasa.gov/mars-photos/api/v1/manifests/spirit/`,
  //       method: 'GET',
  //       params: {
  //           api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
  //       }
  //   }).then( (res) => {
  //       console.log('Spirit', res);

  //       this.setState({
  //         manifestData: {
  //           ...this.state.manifestData,
  //           spirit: res
  //         }
  //       })
  //     })

  //     axios({
  //       url: `https://api.nasa.gov/mars-photos/api/v1/manifests/opportunity/`,
  //       method: 'GET',
  //       params: {
  //           api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
  //       }
  //   }).then( (res) => {
  //       console.log('Oportunity', res);

  //       this.setState({
  //         manifestData: {
  //           ...this.state.manifestData,
  //           opportunity: res
  //         }
  //       })
  //     })

  //     axios({
  //       url: `https://api.nasa.gov/mars-photos/api/v1/manifests/curiosity/`,
  //       method: 'GET',
  //       params: {
  //           api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
  //       }
  //   }).then( (res) => {
  //       console.log('Curiosity', res);

  //       this.setState({
  //         manifestData: {
  //           ...this.state.manifestData,
  //           curiosity: res
  //         }
  //       })
  //     })
  // }

  // gettingMaxDay = (rover) => {
  //   axios({
  //     url: `https://api.nasa.gov/mars-photos/api/v1/manifests/${rover}/`,
  //     method: 'GET',
  //     params: {
  //         api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
  //     }
  // }).then( (res) => {
  //     console.log(res);
  //   })
  // }

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


    //this.gettingMaxDay(e.target.value);
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
    console.log(earthDate, landingDate, launchDate, roverName, roverStatus);
    console.log(max_date, total_photos);

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
