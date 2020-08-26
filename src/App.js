import React, { Component } from 'react'
import "./styles/app.scss";
// import Photos from './Photos';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    constructor() {
      super();
      this.state = {
          dayPhoto: [],
          roverPhotos: [],
          spaceInfo: [],
      }
  }

  handleSubmit = () => {
      axios({
          url: `https://api.nasa.gov/planetary/apod`,
          method: 'GET',
          params: {
              api_key: `RQm9PKAWUOxPOwxSYLbTECB3ZtzrjLjlP4R9vIIm`,
              date: `2020-01-16`, // need to be dynamic
          }
      }).then( (res) => {
          console.log(res.data);

          const photoOfTheDay = res.data;

          this.setState({
              dayPhoto: photoOfTheDay,
          })
      })

      axios({
        url: `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos`, // need to be dynamic
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

    axios({
      url: `https://images-api.nasa.gov/search`,
      method: 'GET',
      params: {
          q: '2020', // need to be dynamic
      }
    }).then( (res) => {
      console.log(res.data.collection.items);

      const spaceInfo = res.data.collection.items;

      this.setState({
        spaceInfo: spaceInfo,
      })
    })

  }

  Nav = () => {
    return(
        <div>          
              <header>
                <h1>App</h1>
              </header>
              <Link to={`/photos`}><p>photos</p></Link>
        </div>
    )
  }

  Photos = () => {
    return(
        <div>
          <Link to={`/`}>Go home</Link>
          <Link to="/photos/photooftheday">Photo of the day</Link>
          <Link to="/photos/roverPhotos">Mars Rover Photos</Link>
          <Link to="/photos/spaceInfo">Space Information</Link>
  
          <button onClick={this.handleSubmit}>Find</button>
        </div>
    )
  }

  dayPhoto = () => {
    return(
        <div>
            <h2>This is Photo of the day!</h2>
  
            <div>
              <img src={this.state.dayPhoto.url} alt='image'/>
            </div>
  
            <Link to={`/photos`}>Go back</Link>
        </div>
    )
  }

  RoverPhotos = () => {
    return(
      <div>
        <h2>The rover photos</h2>
        <Link to={`/photos`}>Go back</Link>

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
        <Link to={`/photos`}>Go back</Link>

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
      <Router>
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
