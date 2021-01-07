import React from 'react';
import {
  EASY_DIFFICULTY,
  MEDIUM_DIFFICULTY,
  HARD_DIFFICULTY,
} from '../../constants/difficulties';
import { Line } from './DifficultySettings.styles';
import RadioButton from 'components/RadioButton';
import { useLanguageContext } from 'context/LanguageContext';

const DifficultySettings = ({
  handleChange = (e) => {},
  difficultyValue = '',
}) => {
  const { currentLanguage } = useLanguageContext();

  return (
    <form
      aria-label="difficulty-settings"
      style={{ width: '20em', marginTop: '3em', marginBottom: '3em' }}
    >
      <Line>
        <RadioButton
          type="radio"
          name="difficulty"
          id="easyDifficulty"
          value={JSON.stringify(EASY_DIFFICULTY)}
          onChange={handleChange}
          defaultChecked={EASY_DIFFICULTY.value === difficultyValue}
        >
          {EASY_DIFFICULTY.title[currentLanguage]}
        </RadioButton>
      </Line>
      <Line>
        <RadioButton
          type="radio"
          name="difficulty"
          id="mediumDifficulty"
          value={JSON.stringify(MEDIUM_DIFFICULTY)}
          onChange={handleChange}
          defaultChecked={MEDIUM_DIFFICULTY === difficultyValue}
        >
          {MEDIUM_DIFFICULTY.title[currentLanguage]}
        </RadioButton>
      </Line>
      <Line>
        <RadioButton
          type="radio"
          name="difficulty"
          id="hardDifficulty"
          value={JSON.stringify(HARD_DIFFICULTY)}
          onChange={handleChange}
          defaultChecked={HARD_DIFFICULTY === difficultyValue}
        >
          {HARD_DIFFICULTY.title[currentLanguage]}
        </RadioButton>
      </Line>
    </form>
  );
};

export default DifficultySettings;
