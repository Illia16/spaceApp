import React from 'react';
import "./styles/general.scss";
import BgVideo from './components/presentational/Background/BgVideo';
import MainPage from './components/views/MainPage/MainPage';
import Footer from './components/presentational/Footer/Footer';
import ErrorPage from './components/presentational/404/ErrorPage';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// grabbing every needed component' logic
import { useLogic } from './components/smart/AppContext';

function App() {  
  // using imported functions from other smart components
  const { paths, userInput, manifestData, results, currentPage, changePage, userSelectedQuery, 
          isThereError, showError, errorMsg,
          isLoading,
          findPhotoDay,
          findRoverPhotos,
          findSpaceInfo } = useLogic();

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <BgVideo />
          <div className="App wrapper">
            <Route exact path="/400" component={() => ErrorPage('Something went wrong')} />
            <Route exact path="/404" component={() => ErrorPage('The page not found')} />
            <Route path="/">
                <MainPage
                  isThereError={isThereError}
                  showError={showError}
                  errorMsg={errorMsg}

                  isLoading={isLoading}
                  userInput={userInput}
                  userSelectedQuery={userSelectedQuery}
                  findPhotoDay={findPhotoDay}
                  results={results}

                  findRoverPhotos={findRoverPhotos}
                  findSpaceInfo={findSpaceInfo}

                  manifestData={manifestData}
                  changePage={changePage}
                  currentPage={currentPage}

                  paths={paths}
                  />
            </Route>
          </div>
        < Footer />
      </Router>
  );
};

export default App;