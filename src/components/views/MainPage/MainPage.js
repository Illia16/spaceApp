import React from 'react';
import './main.scss';

// Components
import Error from '../../smart/Error/Error';
import Header from '../../presentational/Header';
import MainPageApod from './MainPageApod';
import MainPageRoverPhotos from './MainPageRoverPhotos';
import MainPageAddInfo from './MainPageAddInfo';


const MainPage = ( props ) => {
    const { isThereError } = props;

    return(
        <div>
            <Header />

            { isThereError ? <Error propsForError={props}/> : null }

            {/* LOOKING FOR PHOTO OF THE DAY */}
            <MainPageApod propsForApod={props}/>

            {/* LOOKING FOR ROVER PHOTOS */}
            <MainPageRoverPhotos propsForRovers={props}/>

            {/* LOOKING FOR ADDITIONAL SPACE INFO */}
            <MainPageAddInfo propsForAddInfo={props}/>
        </div>
    );
};

export default MainPage;