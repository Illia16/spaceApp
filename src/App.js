import React from 'react';
import "./styles/general.scss";
import BgVideo from './components/Background/BgVideo';
import MainPage from './components/MainPage/MainPage';
import Results from './components/Results/Results';
import Footer from './components/Footer/Footer';
import { BrowserRouter as Router, Route } from 'react-router-dom';

// grabbing every needed component' logic
import { useInput } from './components/UserInputResults/UserInputResults';
import { useError } from './components/Error/ErrorContext';
import { useLoading } from './components/Loading/LoadingContext';
import { useDayPhoto } from './components/Results/ApiCallDayPhoto';
import { useRoverPhotos } from './components/Results/ApiCallRoverPhotos';
import { useAddInfo } from './components/Results/ApiCallAddInfo';


function App() {  
  // using imported functions from other smart components
  const { userInput, userSelection, manifestData, getManifestData, results, getData, currentPage, changePage, userSelectedQuery} = useInput();
  const { isThereError, showError, errorMsg, setErrorMsg } = useError();
  const { isLoading, setLoading } = useLoading();
  const { findPhotoDay } = useDayPhoto();
  const { findRoverPhotos } = useRoverPhotos();
  const { findSpaceInfo } = useAddInfo();

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
            
            <Results results={results} manifestData={manifestData} currentPage={currentPage} changePage={changePage} />
          </div>
          < Footer />
      </Router>
  );
};

export default App;