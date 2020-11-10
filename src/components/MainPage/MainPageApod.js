import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/app.scss";

import LoadingLogo from '../presentational/LoadingLogo';

    // Because some variable are gonna have the same name if declared, they're gonna be called without destructuring 
        // props.propsForApod.states.loadingStatus.dayPhoto
        // props.propsForApod.states.loadingStatus.roverPhotos
        // props.propsForApod.states.loadingStatus.spaceInfo

const MainPageApod = (props) => {
    const { propsForApod: { states:{ resultsReady:{dayPhoto}, date }, userSelection, findPhotoDay } } = props;

    return(
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
                (dayPhoto && !props.propsForApod.states.loadingStatus.dayPhoto)
                ? <NavLink to="/photooftheday" className="resultsLink">SEE RESULTS</NavLink>
                : null
            }

            {/* WAITING LOGO WHILE GETTING THE RESULTS */}
            {
                props.propsForApod.states.loadingStatus.dayPhoto
                ? <LoadingLogo /> : null
            }
            </div>
        </form>
    </section>
    );
};

export default MainPageApod;