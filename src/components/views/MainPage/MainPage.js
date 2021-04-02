import React from 'react';
import './main.scss';

// Components
import Error from '../../presentational/Error/Error';
import Header from '../../presentational/Header';
import MainPageApod from './MainPageApod';
import MainPageRoverPhotos from './MainPageRoverPhotos';
import MainPageAddInfo from './MainPageAddInfo';
import Results from '../Results/Results';
import { Redirect, Route, useLocation } from 'react-router-dom';

const MainPage = ( props ) => {
    const { isThereError, 
            userInput: {date, roverName, searchText}, 
            results,
            manifestData,
            currentPage,
            changePage,
            paths
        } = props;
    
    let location = useLocation();

    return(
        <div>
            <Route exact path="/">
                <Header />

                { isThereError ? <Error propsForError={props}/> : null }

                {/* LOOKING FOR PHOTO OF THE DAY */}
                <MainPageApod propsForApod={props}/>

                {/* LOOKING FOR ROVER PHOTOS */}
                <MainPageRoverPhotos propsForRovers={props}/>

                {/* LOOKING FOR ADDITIONAL SPACE INFO */}
                <MainPageAddInfo propsForAddInfo={props}/>
            </Route>

            {( (!date && !roverName && !searchText) && paths.includes(location.pathname) && location.pathname !== '/' ) ? <Redirect to="/400" /> 
              :
            <Results 
                results={results} 
                manifestData={manifestData} 
                currentPage={currentPage} 
                changePage={changePage}
                paths={paths}
            />
            }
            { !paths.includes(location.pathname) && <Redirect to="/404" /> }
        </div>
    );
};

export default MainPage;