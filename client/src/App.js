import React from 'react';
import '@fortawesome/fontawesome-free/css/all.css';
import './index.css';
import Nav from './domains/Nav/Nav';
import { AuthProvider } from './context/AuthContext/AuthContext';
import { LanguageProvider } from './context/LanguageContext/LanguageContext';
import { AppLookProvider } from 'context/AppLookContext';
import { LoadingProvider } from 'context/LoadingContext';
import { AppWrapper, AppStyle } from 'App.styles';
import { BrowserRouter as Router } from 'react-router-dom';
import { Routes } from 'Routes';

const App = () => {
  return (
    <AppLookProvider>
      <LoadingProvider>
        <AuthProvider>
          <LanguageProvider>
            <AppStyle />
            <Router>
              <AppWrapper>
                <Nav />
                <Routes />
              </AppWrapper>
            </Router>
          </LanguageProvider>
        </AuthProvider>
      </LoadingProvider>
    </AppLookProvider>
  );
};

export default App;
