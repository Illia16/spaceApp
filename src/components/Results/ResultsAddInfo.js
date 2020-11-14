import React from 'react';
import "../../styles/app.scss";
import GoBackButton from '../GoBackButton';

const ResultsAddInfo = ( props ) => {
        return (
            <div>
                <h3>Space Information</h3>

                <ul className="spaceInfoRes">
                    {
                        // spaceInfo.slice(0, 20).map((obj) => {
                        props.propsForAddInfo.map((obj) => {
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
};

export default ResultsAddInfo;