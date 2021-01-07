import SuspendedImage from 'components/SuspendedImage';
import cardsThemes from 'constants/cardsThemes';
import { useLanguageContext } from 'context/LanguageContext';
import React from 'react';
import ThemeLabel from '../ThemeLabel';
import { CardThemesForm } from './CardsThemeSettings.styles';
import { headings } from './CardsThemeSettings.text';

const CardsThemeSettings = ({
  changeCardsTheme = (cardsThemeRef = '') => {},
  initialCardsThemeRef = '',
  ...args
}) => {
  const { currentLanguage } = useLanguageContext();

  const onChange = (e) => {
    const value = JSON.parse(e.target.value);

    changeCardsTheme(value);
  };

  return (
    <div {...args} id={`${args?.id ? args.id : ''} CardsTheme`}>
      <h2 style={{ textAlign: 'center', marginBottom: '2em' }}>
        {headings.main[currentLanguage]}
      </h2>
      <CardThemesForm>
        {Object.values(cardsThemes).map((theme, index) => (
          <ThemeLabel key={index}>
            <SuspendedImage src={theme.icon} />
            <input
              type="radio"
              name="cardsTheme"
              value={JSON.stringify({
                ref: theme.ref,
                title: theme.title[currentLanguage],
              })}
              onChange={onChange}
              checked={initialCardsThemeRef === theme.ref}
            />
          </ThemeLabel>
        ))}
      </CardThemesForm>
    </div>
  );
};

export default CardsThemeSettings;
