import React from 'react';
import { Route } from 'react-router-dom';
import "../styles/app.scss";
import GoBackButton from './presentational/GoBackButton';

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import carouselSizesRoverPhotos from '../styles/carouselSizes';

const Results = ( props ) => {
    const {states:{dayPhoto, roverPhotos, manifestData, spaceInfo} } = props;
    // 3 result components: dayPhoto, roverPhotos, spaceInfo /////////////////////////////////////////////////////////////////
    const dayPhotoResults = () => {
        const { title, url, copyright, date, explanation, media_type } = dayPhoto;

        return (
            <div className="dayPhotoRes">
                <h3>{title}</h3>
                {
                    dayPhoto.hasOwnProperty("copyright") ?
                        <p>{media_type === "image" ? 'Photo of the day' : 'Video of the day'} <span>{date}</span> by {copyright}</p>
                        :
                        <p>{media_type === "image" ? 'Photo of the day' : 'Video of the day'} <span>{date}</span> by unknown author</p>
                }
                <p>{explanation}</p>
                <div>
                    {
                        media_type === 'image' ? <img src={url} alt={title} /> :
                            <iframe
                                src={url}
                                frameBorder='0'
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='video'
                                width='550px'
                                height='325px'
                            />
                    }
                </div>
                <GoBackButton />
            </div>
        )
    }

    const RoverPhotosResults = () => {
        const [{ earth_date: earthDate, rover: { landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus } }] = roverPhotos

        const { max_date, total_photos } = manifestData
        return (
            <div className="roverPhotosRes">
                <h3>Photos</h3>
                <p>Rover name <span>{roverName}</span></p>
                <p>Photos taken on <span>{earthDate}</span></p>
                <p>Rover left Earth <span>{launchDate}</span></p>
                <p>Rover landed on Mars <span>{landingDate}</span></p>
                <p>Total photos taken by {roverName} <span>{total_photos}</span></p>
                <p>The last photos taken on <span>{max_date}</span></p>
                <p>Status <span>{roverStatus}</span></p>

                {/* className="roverPhotos" */}
                <Carousel
                    swipeable={true}
                    draggable={true}
                    arrows={true}
                    keyBoardControl={true}
                    responsive={carouselSizesRoverPhotos}
                    customTransition="all .5"
                    transitionDuration={500}
                    containerClass="roverPhotosContainer"
                    itemClass="roverPhotosItem"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    partialVisible={false}
                >
                    {
                        roverPhotos.map( (obj) => {
                            return (
                                <div key={obj.id}><img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`} /></div>
                            )
                        })
                    }
                </Carousel>
                <GoBackButton />
            </div>
        )
    }

    const SpaceInfoResults = () => {
        return (
            <div>
                <h3>Space Information</h3>

                <ul className="spaceInfoRes">
                    {
                        // spaceInfo.slice(0, 20).map((obj) => {
                        spaceInfo.map((obj) => {
                            return (
                                <li key={obj.data[0].nasa_id}>
                                    <h4>{obj.data[0].title}</h4>
                                    {
                                        obj.hasOwnProperty('links') ? <div className="imgParent"><img src={obj.links[0].href} alt={`${obj.data[0].title}`} /></div> : null
                                    }
                                    <p>{obj.data[0].description}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <GoBackButton />
            </div>
        )
    }


    return(
        <div>
            <Route exact path="/photooftheday" component={dayPhotoResults} />
            <Route exact path="/roverPhotos" component={ RoverPhotosResults } />
            <Route exact path="/spaceInfo" component={ SpaceInfoResults } />
        </div>
    );
};

export default Results;