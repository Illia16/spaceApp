import React from 'react';
import { NavLink } from 'react-router-dom';
import "../../styles/app.scss";

import LoadingLogo from '../presentational/LoadingLogo';

const MainPageAddInfo = (props) => {
    const {propsForAddInfo: { states:{ resultsReady:{spaceInfo}, loadingStatus, searchText},  userSelection, findSpaceInfo }} = props;

    return(
        <section>
            <h2>Space information</h2>
            <p>Search space information based on the search input. The result shows up a list of items based on user requets. The list includes title of the event, its photo and description.</p>

            <form action="">
                <div className="spaceInfo">
                    <label htmlFor="text" className="srOnly">Input your search query</label>
                    <input onChange={userSelection} type="text" name="searchText" id="text" value={searchText} placeholder="e.g. Nebulae"/>
                    
                    <button onClick={findSpaceInfo}>SEARCH</button>

                    {
                    (spaceInfo && !loadingStatus.spaceInfo)
                    ? <NavLink to="/spaceInfo" className="resultsLink">SEE RESULTS</NavLink>
                    : null
                    }

                    {
                    loadingStatus.spaceInfo ? <LoadingLogo /> : null
                    }
                </div>
            </form>
        </section>
    );
};

export default MainPageAddInfo;