import React from 'react';
import { NavLink } from 'react-router-dom';

import LoadingLogo from '../../presentational/Loading/LoadingLogo';

const MainPageApod = (props) => {
    const { propsForApod: { isLoading, results: {dayPhoto}, userInput, userSelectedQuery, findPhotoDay } } = props;

    return(
        <section>
            <h2>Photo/Video of the day</h2>
            <p>Select a desired date. If date is not selected, by default today's date is set. The result shows up the title of the photo of the selected date, author name, description and the photo as well.</p>

            <form action="">
                <div className="dayPhoto">
                    <label htmlFor="date" className="srOnly">Pick a date</label>
                    <input onChange={userSelectedQuery} type="date" id="date" name="date" placeholder="e.g.: 2020-07-11" value={userInput.date}/>

                    <button onClick={findPhotoDay}>SEARCH</button>

                    {/* SHOW RESULTS ONCE WE GET THEM */}
                    {
                    (dayPhoto.date && !isLoading.date) ? <NavLink to="/photooftheday" className="resultsLink">SEE RESULTS</NavLink>
                    : isLoading.date ? <LoadingLogo /> : null
                    }
                </div>
            </form>
        </section>
    );
};

export default MainPageApod;