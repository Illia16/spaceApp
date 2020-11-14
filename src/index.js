import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import ErrorProvider from './components/Error/ErrorContext';
import UserInputProvider from './components/UserInput/UserInput';
import LoadingProvider from './components/Loading/LoadingContext';
import DayPhotoProvider from './components/Results/ApiCallDayPhoto';

ReactDOM.render(
  <React.StrictMode>
    <UserInputProvider>
      <ErrorProvider>
        <LoadingProvider>
          <DayPhotoProvider>
            <App />
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
