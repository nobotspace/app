import React from 'react';
import ReactDOM from 'react-dom/client';
import 'styles/base.scss';
import App from './app/App';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { persistedStore, store } from "app/store";
import { PersistGate } from "redux-persist/integration/react";
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import AuthContextProvider from 'contexts/AuthContext';
import { HelmetProvider } from 'react-helmet-async';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistedStore}>
            <AuthContextProvider>
              <App />
            </AuthContextProvider>
          </PersistGate>
        </Provider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
