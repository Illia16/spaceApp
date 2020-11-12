import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/app.scss";

import LoadingLogo from '../presentational/LoadingLogo';

const MainPageRoverPhotos = (props) => {
    const { propsForRovers: { isLoading:{roverName}, results: {roverPhotos}, userInput, userSelectedQuery, findRoverPhotos } } = props;

    return(
        <section>
            <h2>Mars Rover photos</h2>
            <p>Select a rover. The result shows up photos taken by a selected rover on one of the days, information about rover; when it left Earth, landed on Mars, how many photos took(taken if still operates) as well as when the last photos were taken.</p>

            <form action="">
                <div className="roverPhotos">
                    <label htmlFor="rover" className="srOnly">Select a rover</label>

                    <select onChange={ userSelectedQuery } type="rover" id="rover" name="roverName" value={userInput.roverName}>
                        <option name="roverName" value="">Pick a Mars rover</option>
                        <option name="roverName" value="spirit">Spirit</option>
                        <option name="roverName" value="opportunity">Opportunity</option>
                        <option name="roverName" value="curiosity">Curiosity</option>
                    </select>

                    <button onClick={ findRoverPhotos }>SEARCH</button>

                    {
                        (roverPhotos.length)
                        ?<NavLink to="/roverPhotos" className="resultsLink">SEE RESULTS</NavLink>
                        : null
                    }

                    { roverName ? <LoadingLogo /> : null }
                </div>
            </form>
        </section>
    );
};

export default MainPageRoverPhotos;