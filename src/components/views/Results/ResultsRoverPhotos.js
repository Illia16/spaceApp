import React from 'react';
import GoBackButton from '../../presentational/GoBackButton';

const ResultsRoverPhotos = ( props ) => {
        const { roverPhotos: [ { earth_date: earthDate, rover: { landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus } } ], manifestData } = props;
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

                <ul>
                    {
                        props.roverPhotos.map( (obj) => {
                            return (
                                <li key={obj.id}>
                                    <img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`} />
                                    <a href={obj.img_src} target='_blank' rel='noopener noreferrer'>Full image</a>
                                </li>
                            )
                        })
                    }
                </ul>
                <GoBackButton />
            </div>
        )
};

export default ResultsRoverPhotos;