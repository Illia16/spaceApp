import React from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import "./styles/app.scss";

const Results = ( props ) => {
    const {states:{dayPhoto, roverPhotos, manifestData, spaceInfo}, goBack} = props;

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
                { goBack()}
            </div>
        )
    }

    const RoverPhotosResults = () => {
        const [{ earth_date: earthDate, rover: { landing_date: landingDate, launch_date: launchDate, name: roverName, status: roverStatus } }] = roverPhotos

        const { max_date, total_photos } = manifestData

        return (
            <div className="roverPhotosRes">
                <h3>{roverName} rover photos </h3>
                <p>Photos taken on <span>{earthDate}</span></p>
                <p>Left Earth <span>{launchDate}</span></p>
                <p>Landed on Mars <span>{landingDate}</span></p>
                <p>Total photos taken <span>{total_photos}</span></p>
                <p>The last photos taken on <span>{max_date}</span></p>
                <p>Status <span>{roverStatus}</span></p>

                <ul className="roverPhotos">
                    {
                        roverPhotos.map((obj) => {
                            return (
                                <li key={obj.id}><img src={obj.img_src} alt={`taken by ${obj.rover.name} on ${obj.earth_date}`} /></li>
                            )
                        })
                    }
                </ul>
                { goBack() }
            </div>
        )
    }

    const SpaceInfoResults = () => {
        return (
            <div>
                <h3>Space Information</h3>

                <ul className="spaceInfoRes">
                    {
                        spaceInfo.slice(0, 20).map((obj) => {
                            // console.log(obj);
                            // console.log(obj.hasOwnProperty('links'));

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
                { goBack()}
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