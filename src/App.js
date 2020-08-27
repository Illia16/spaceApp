import React, { Component } from 'react'
import "./styles/app.scss";
// import Photos from './Photos';
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
      }
  }


  findPhotoDay = () => {
    axios({
      url: `https://api.nasa.gov/planetary/apod`,
      method: 'GET',
      params: {
          api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
          date: this.state.date,
      }
  }).then( (res) => {
      console.log(res.data);

      const photoOfTheDay = res.data;

      this.setState({
          dayPhoto: photoOfTheDay,
      })
  })
}

  findRoverPhotos = () => {
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
        })
    })
  }

  findSpaceInfo = () => {
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
      })
    })

  }

  userSelection = (e) => {
    console.log(e.target);
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  Nav = () => {
    return(
        <div>          
              <header>
                <h1>Space App</h1>
              </header>
              <Link to={`/photos`}><p>photos</p></Link>

              {/* LOOKING FOR PHOTO OF THE DAY */}
              <div>
                <Link to="/photos/photooftheday" style={{ padding: '10px' }}>See Photo of the day</Link>

                <form action="">
                  <label htmlFor="date"></label>
                  <input onChange={this.userSelection} type="date" name="date" id="date"/>
                </form>

                <button onClick={this.findPhotoDay}>Find photo of the day</button>
              </div>

              {/* LOOKING FOR ROVER PHOTOS */}
              <div>
              <Link to="/photos/roverPhotos"  style={{ padding: '10px' }}>See Mars Rover Photos</Link>

                <form action="">
                  <label htmlFor="rover">Pick a group to investigate plz</label>

                  <select onChange={ this.userSelection } type="rover" id="rover" name="roverName">
                    <option name="roverName" value="">Select a desired rover</option>
                    <option name="roverName" value="spirit">Spirit</option>
                    <option name="roverName" value="opportunity">Opportunity</option>
                    <option name="roverName" value="curiosity">Curiosity</option>
                  </select>
                </form>
                
                <button onClick={this.findRoverPhotos}>Find rover photos</button>
              </div>

              {/* LOOKING FOR ADDITIONAL SPACE INFO */}
              <div>
              <Link to="/photos/spaceInfo"  style={{ padding: '10px' }}>See Space Information</Link>

                <form action="">
                  <label htmlFor="text"></label>
                  <input onChange={this.userSelection} type="text" name="searchText" id="text" />
                </form>
                
                <button onClick={this.findSpaceInfo}>Find additional space info</button>
              </div>
        </div>
    )
  }

  Photos = () => {
    return(
        <div>
          <Link to={`/`}>Go home</Link>
        </div>
    )
  }

  dayPhoto = () => {
    return(
        <div>
            <Link to={`/`}>Go back</Link>
            <h2>This is Photo of the day!</h2>
  
            <div>
              <img src={this.state.dayPhoto.url} alt='image'/>
            </div>
  
        </div>
    )
  }

  RoverPhotos = () => {
    return(
      <div>
        <h2>The rover photos</h2>
        <Link to={`/`}>Go back</Link>

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
