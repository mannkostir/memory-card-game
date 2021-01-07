import React from 'react';
import LoginForm from './components/LoginForm';
import { useDOM } from 'hooks/useDOM';
import Preloader from 'components/Preloader';
import { headings } from './Login.text';
import { useLanguageContext } from 'context/LanguageContext';

const Login = () => {
  const { isDOMLoaded } = useDOM();

  const { currentLanguage } = useLanguageContext();
  return (
    <section>
      <Preloader isVisible={!isDOMLoaded} />
      <h1>{headings.main[currentLanguage]}</h1>
      <LoginForm />
    </section>
  );
};

export default Login;
