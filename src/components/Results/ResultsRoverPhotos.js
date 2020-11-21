import React from 'react';
import GoBackButton from '../GoBackButton';

// Carousel
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import carouselSizesRoverPhotos from '../../styles/carouselSizes';

const ResultsRoverPhotos = ( props ) => {
        const { roverPhotos: [ { earth_date: earthDate, rover: { landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus } } ], manifestData } = props;
        // { max_date, total_photos }
        console.log(props, roverName);
        console.log(manifestData);
        return (
            <div className="roverPhotosRes">
                <h3>Photos</h3>
                <p>Rover name <span>{roverName}</span></p>
                <p>Photos taken on <span>{earthDate}</span></p>
                <p>Rover left Earth <span>{launchDate}</span></p>
                <p>Rover landed on Mars <span>{landingDate}</span></p>
                <p>Total photos taken by {roverName} <span>{manifestData[roverName.toLowerCase()].total_photos}</span></p>
                <p>The last photos taken on <span>{manifestData[roverName.toLowerCase()].max_date}</span></p>
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
                        props.roverPhotos.map( (obj) => {
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