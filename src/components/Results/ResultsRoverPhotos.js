import React from 'react';
import "../../styles/app.scss";
import GoBackButton from '../presentational/GoBackButton';

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import carouselSizesRoverPhotos from '../../styles/carouselSizes';

const ResultsRoverPhotos = ( props ) => {
        const { propsForRoverPhotos: [ [{ earth_date: earthDate, rover: { landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus } }], { max_date, total_photos }] } = props;
        
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
                        props.propsForRoverPhotos[0].map( (obj) => {
                            return (
                                <div key={obj.id}><img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`} /></div>
                            )
                        })
                    }
                </Carousel>
                <GoBackButton />
            </div>
        )
};

export default ResultsRoverPhotos;