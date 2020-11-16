import React from 'react';
import GoBackButton from '../GoBackButton';

const ResultsDayPhoto = ( props ) => {
    const { propsForDayPhoto: { title, url, copyright, date, explanation, media_type } } = props;

        return (
            <div className="dayPhotoRes">
                <h3>{title}</h3>
                {
                    props.propsForDayPhoto.hasOwnProperty("copyright") ?
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
};

export default ResultsDayPhoto;