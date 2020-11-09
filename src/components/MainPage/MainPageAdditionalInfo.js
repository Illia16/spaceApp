import React from 'react';
import Error from '../Error';
import { NavLink } from 'react-router-dom';
import Header from '../presentational/Header';
import "../../styles/app.scss";

const MainPage = ( props ) => {
    const {states:{ resultsReady:{dayPhoto, roverPhotos, spaceInfo}, date, roverName, searchText, errorPopUp},  closeWindow, userSelection, findPhotoDay, findRoverPhotos, findSpaceInfo } = props;
    // console.log(props);

    // Because some variable are gonna have the same name if declared, they're gonna be called without destructuring 
        // props.states.loadingStatus.dayPhoto
        // props.states.loadingStatus.roverPhotos
        // props.states.loadingStatus.spaceInfo
    return(
        <div>
            <Header />
            
            { errorPopUp ? <Error states={props.states} closeWindow={closeWindow} /> : null }

            {/* LOOKING FOR PHOTO OF THE DAY */}
                <section>
                    <h2>Photo/Video of the day</h2>
                    <p>Select a desired date. If date is not selected, by default today's date is set. The result shows up the title of the photo of the selected date, author name, description and the photo as well.</p>

                    <form action="">
                        <div className="dayPhoto">
                        <label htmlFor="date" className="srOnly">Pick a date</label>
                        <input onChange={userSelection} type="date" id="date" name="date" placeholder="e.g.: 2020-07-11" value={date}/>

                        <button onClick={findPhotoDay}>SEARCH</button>

                        {/* SHOW RESULTS ONCE WE GET THEM */}
                        {
                            (dayPhoto && !props.states.loadingStatus.dayPhoto)
                            ? <NavLink to="/photooftheday" className="resultsLink">SEE RESULTS</NavLink>
                            : null
                        }

                        {/* WAITING LOGO WHILE GETTING THE RESULTS */}
                        {
                            props.states.loadingStatus.dayPhoto
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

                        <select onChange={ userSelection } type="rover" id="rover" name="roverName" value={roverName}>
                            <option name="roverName" value="">Pick a Mars rover</option>
                            <option name="roverName" value="spirit">Spirit</option>
                            <option name="roverName" value="opportunity">Opportunity</option>
                            <option name="roverName" value="curiosity">Curiosity</option>
                        </select>

                        <button onClick={findRoverPhotos}>SEARCH</button>

                        {
                            (roverPhotos && !props.states.loadingStatus.roverPhotos)
                            ?<NavLink to="/roverPhotos" className="resultsLink">SEE RESULTS</NavLink>
                            : null
                        }

                        {
                            props.states.loadingStatus.roverPhotos
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
                    <input onChange={userSelection} type="text" name="searchText" id="text" value={searchText} placeholder="e.g. Nebulae"/>
                    
                    <button onClick={findSpaceInfo}>SEARCH</button>

                    {
                    (spaceInfo && !props.states.loadingStatus.spaceInfo)
                    ? <NavLink to="/spaceInfo" className="resultsLink">SEE RESULTS</NavLink>
                    
                    : null
                    }

                    {
                    props.states.loadingStatus.spaceInfo
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
    );
};

export default MainPage;