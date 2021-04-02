import React from 'react';
import { Route } from 'react-router-dom';
import "./results.scss";

// UI components
import ResultsDayPhoto from './ResultsDayPhoto'
import ResultsRoverPhotos from './ResultsRoverPhotos'
import ResultsAddInfo from './ResultsAddInfo'

const Results = ( props ) => {
    const { results:{dayPhoto, roverPhotos, spaceInfo}, 
            manifestData, 
            currentPage, 
            changePage, 
            paths: [homepage, apodPath, roverPath, infoPath],
        } = props;

    // 3 result components: dayPhoto, roverPhotos, spaceInfo /////////////////////////////////////////////////////////////////
    return(
        <div>
            <Route exact path={apodPath}>
                <ResultsDayPhoto propsForDayPhoto={dayPhoto} />
            </Route>

            <Route exact path={roverPath}>
                <ResultsRoverPhotos roverPhotos={roverPhotos} manifestData={manifestData} />
            </Route>

            <Route exact path={infoPath}>
                <ResultsAddInfo propsForAddInfo={spaceInfo} currentPage={currentPage} changePage={changePage} />
            </Route>
        </div>
    );
};

export default Results;