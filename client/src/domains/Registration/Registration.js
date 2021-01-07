import { useAppLookDispatch } from 'context/AppLookContext/useAppLookDispatch';
import { useLanguageContext } from 'context/LanguageContext';
import { useMount } from 'hooks/useMount';
import { useToggle } from 'hooks/useToggle';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import RegistrationForm from './components/RegistrationForm';
import { SecurityWarning } from './components/SecurityWarning/SecurityWarning';
import { headings } from './Registration.text';

const Registration = () => {
  const { currentLanguage } = useLanguageContext();

  // In case if I'll go with exposing secrets (.env)

  // const [isWarningShown, setIsWarningShown] = useState(false);

  // const { setIsOverlay } = useAppLookDispatch();

  // useMount(() => {
  //   setIsWarningShown(false);
  // });

  // useEffect(() => {
  //   setIsOverlay(!isWarningShown);
  // }, [isWarningShown]);

  return (
    <section>
      <h1>{headings.main[currentLanguage]}</h1>
      {/* {isWarningShown ? null : (
        <SecurityWarning
          isOpen={!isWarningShown}
          onClose={() => setIsWarningShown(true)}
        />
      )} */}
      <RegistrationForm />
    </section>
  );
};

export default Registration;
