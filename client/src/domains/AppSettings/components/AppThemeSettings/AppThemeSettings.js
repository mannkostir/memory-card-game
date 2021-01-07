import React from 'react';
import appThemes from 'constants/appThemes';
import { useLanguageContext } from 'context/LanguageContext';
import { text } from './AppThemeSettings.text';
import { AppThemesForm } from './AppThemeSettings.styles';
import ThemeLabel from '../ThemeLabel';

const AppThemeSettings = ({
  changeAppTheme = (appTheme = {}) => {},
  initialAppThemeRef = '',
  ...args
}) => {
  const { currentLanguage } = useLanguageContext();

  const onChange = (e) => {
    const value = JSON.parse(e.target.value);

    changeAppTheme(value);
  };

  return (
    <div {...args} id={`${args?.id ? args.id : ''} AppTheme`}>
      <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>
        {text.headings.sectionHeading[currentLanguage]}
      </h2>
      <AppThemesForm>
        {Object.values(appThemes).map((theme, index) => (
          <ThemeLabel key={index}>
            {theme.icon ? (
              <img src={theme.icon} alt={theme.title[currentLanguage]} />
            ) : null}
            <span>{theme.title[currentLanguage]}</span>
            <input
              type="radio"
              name="appTheme"
              value={JSON.stringify({
                ...theme,
                title: theme.title[currentLanguage],
              })}
              onChange={onChange}
              checked={initialAppThemeRef === theme.ref}
            />
          </ThemeLabel>
        ))}
      </AppThemesForm>
    </div>
  );
};

export default AppThemeSettings;
