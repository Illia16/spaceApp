import React from 'react';
import { Route } from 'react-router-dom';
import "./results.scss";

// UI components
import ResultsDayPhoto from './ResultsDayPhoto'
import ResultsRoverPhotos from './ResultsRoverPhotos'
import ResultsAddInfo from './ResultsAddInfo'

const Results = ( props ) => {
    const {results:{dayPhoto, roverPhotos, manifestData, spaceInfo} } = props;
    // 3 result components: dayPhoto, roverPhotos, spaceInfo /////////////////////////////////////////////////////////////////
    return(
        <div>
            <Route exact path="/photooftheday">
                <ResultsDayPhoto propsForDayPhoto={dayPhoto} />
            </Route>

            <Route exact path="/roverPhotos">
                <ResultsRoverPhotos propsForRoverPhotos={[roverPhotos, manifestData]} />
            </Route>

            <Route exact path="/spaceInfo">
                <ResultsAddInfo propsForAddInfo={spaceInfo} />
            </Route>
        </div>
    );
};

export default Results;