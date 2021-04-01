import React from 'react';
import "./styles/general.scss";
import BgVideo from './components/presentational/Background/BgVideo';
import MainPage from './components/views/MainPage/MainPage';
import Results from './components/views/Results/Results';
import Footer from './components/presentational/Footer/Footer';
import Page404 from './components/presentational/404/404';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

// grabbing every needed component' logic
import { useLogic } from './components/smart/AppContext';

function App() {  
  // using imported functions from other smart components
  const { userInput, manifestData, results, currentPage, changePage, userSelectedQuery, 
          isThereError, showError, errorMsg,
          isLoading,
          findPhotoDay,
          findRoverPhotos,
          findSpaceInfo } = useLogic();

    return (
      <Router basename={process.env.PUBLIC_URL}>
        <BgVideo />
        <div className="App wrapper">
          <Route exact path="/">
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
                />
          </Route>
        <Switch>
          <Route path="/">
            <Results results={results} manifestData={manifestData} currentPage={currentPage} changePage={changePage} />
            {/* {( (!userInput.date || !userInput.roverName || !userInput.searchText) && window.location.pathname != '/spaceApp/') && <Redirect to="/404" /> } */}
            {/* <Route exact path="/404" component={Page404} /> */}
            <Route component={Page404} />
          </Route>
        </Switch>
        </div>
        < Footer />
      </Router>
  );
};

export default App;