import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ErrorProvider from './components/smart/Error/ErrorContext';
import UserInputProvider from './components/smart/UserInputResults/UserInputResults';
import LoadingProvider from './components/smart/Loading/LoadingContext';
import DayPhotoProvider from './components/smart/Results/ApiCallDayPhoto';
import RoverPhotosProvider from './components/smart/Results/ApiCallRoverPhotos';
import AddInfoProvider from './components/smart/Results/ApiCallAddInfo';

ReactDOM.render(
  <React.StrictMode>
    <UserInputProvider>
      <ErrorProvider>
        <LoadingProvider>
          <DayPhotoProvider>
            <RoverPhotosProvider>
              <AddInfoProvider>
                <App />
              </AddInfoProvider>
            </RoverPhotosProvider>
          </DayPhotoProvider>
        </LoadingProvider>
      </ErrorProvider>
    </UserInputProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
