import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/app.scss";

import LoadingLogo from '../presentational/LoadingLogo';

const MainPageApod = (props) => {
    const { propsForApod: { states:{ resultsReady:{dayPhoto}, loadingStatus, date }, userSelection, findPhotoDay } } = props;

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
                    (dayPhoto && !loadingStatus.dayPhoto)
                    ? <NavLink to="/photooftheday" className="resultsLink">SEE RESULTS</NavLink>
                    : null
                }

                {/* WAITING LOGO WHILE GETTING THE RESULTS */}
                {
                    loadingStatus.dayPhoto ? <LoadingLogo /> : null
                }
            </div>
        </form>
    </section>
    );
};

export default MainPageApod;