import React from 'react';
import GoBackButton from '../../presentational/GoBackButton';
import LazyLoad from 'react-lazyload';
import Loading from '../../presentational/Loading/LoadingLogo';

// FUNCTIONS
import checkPrevNextPages from '../../../helpers/checkPrevNextPages/checkPrevNextPages';

const ResultsAddInfo = ( props ) => {
        const { changePage } = props;
        const checkingPages = checkPrevNextPages(props.propsForAddInfo.links);

        return (
            <div>
                <h3>Space Information</h3>

                <ul className="spaceInfoRes">
                    {
                        // props.propsForAddInfo.items.slice(0, 10).map((obj) => {
                        props.propsForAddInfo.items.map((obj) => {
                            return (
                                <LazyLoad
                                    key={obj.data[0].nasa_id}
                                    height={100}
                                    // offset={[-100,100]}
                                    offset={-50}
                                    placeholder={<Loading/>}
                                    // once
                                >
                                    {/* <li key={obj.data[0].nasa_id}> */}
                                    <li>
                                        <h4>{obj.data[0].title}</h4>
                                        {
                                            obj.hasOwnProperty('links') ? <div className="imgParent"><img src={obj.links[0].href} alt={`${obj.data[0].title}`} /></div> : null
                                        }
                                        <p>{obj.data[0].description}</p>
                                    </li>
                                </LazyLoad>
                            )
                        })
                    }
                </ul>
                
                {
                    (checkingPages && checkingPages[0]) === 'prev' ? 
                        <div className='prevNextPages'>
                            <button onClick={ () => changePage(checkingPages[1]) } aria-label='go to the previous page'><i className="fas fa-chevron-left" aria-hidden='true'></i></button>
                        </div>
                    : (checkingPages && checkingPages[0]) === 'next' ? 
                        <div className='prevNextPages'>                    
                            <button onClick={ () => changePage(checkingPages[1]) } aria-label='go to the next page'><i className="fas fa-chevron-right" aria-hidden='true'></i></button>
                        </div>
                    : checkingPages ?
                    <div className='prevNextPages'>
                        <button onClick={ () => changePage(checkingPages[0]) } aria-label='go to the previous page'><i className="fas fa-chevron-left" aria-hidden='true'></i></button>
                        <button onClick={ () => changePage(checkingPages[1]) } aria-label='go to the next page'><i className="fas fa-chevron-right" aria-hidden='true'></i></button>
                    </div>
                    : null
                }
                <GoBackButton  changePage={changePage} />
            </div>
        )
};

export default ResultsAddInfo;