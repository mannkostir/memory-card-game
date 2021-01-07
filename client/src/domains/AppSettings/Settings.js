import React, { Suspense } from 'react';
import AppThemeSettings from './components/AppThemeSettings';
import CardsThemeSettings from './components/CardsThemeSettings';
import CenteredContainer from 'components/CenteredContainer/CenteredContainer';
import { ChangeConfirm } from './components/ChangeConfirm/ChangeConfirm';
import Preloader from 'components/Preloader';
import { headings } from './Settings.text';
import { useLanguageContext } from 'context/LanguageContext';
import { useSettingsChanges } from './hooks/useSettingsChanges';
import { useAppLookState } from 'context/AppLookContext/useAppLookState';
import { changeKeys } from './constants/settingsChangeKeys';
import { SeparatorLine } from './Settings.styles';

const Settings = () => {
  const { currentLanguage } = useLanguageContext();

  const {
    resetAllChanges,
    resetOneChange,
    changeCardsTheme,
    changeAppTheme,
    applyChanges,
    changes,
  } = useSettingsChanges();

  const { appTheme, cardsThemeRef } = useAppLookState();

  return (
    <section>
      <Suspense fallback={<Preloader />}>
        <ChangeConfirm
          changesObj={changes}
          resetAllChanges={resetAllChanges}
          resetOneChange={resetOneChange}
          applyChanges={applyChanges}
          style={{
            visibility: Object.keys(changes).length ? 'visible' : 'hidden',
          }}
        />
        <CenteredContainer>
          <h1>{headings.mainHeading[currentLanguage]}</h1>
          <AppThemeSettings
            initialAppThemeRef={
              changes[changeKeys.appTheme[currentLanguage]]?.ref || appTheme.ref
            }
            changeAppTheme={changeAppTheme}
          />
          <SeparatorLine />
          <CardsThemeSettings
            changeCardsTheme={changeCardsTheme}
            initialCardsThemeRef={
              changes[changeKeys.cardsTheme[currentLanguage]]?.ref ||
              cardsThemeRef
            }
          />
        </CenteredContainer>
      </Suspense>
    </section>
  );
};

export default Settings;
