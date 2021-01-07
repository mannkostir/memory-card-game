import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import CardsDeck from './CardsDeck';
import { GameProvider } from './context/GameContext/GameContext';
import { TimerProvider } from './context/TimerContext/TimerContext';
import { GameEventsProvider } from './context/GameEventsContext/GameEventsContext';
import { ThemeProvider } from 'context/AppLookContext';
import { AuthProvider } from 'context/AuthContext';
import { LanguageProvider } from 'context/LanguageContext';

describe('CardsDeck', () => {
  test('test', () => {
    render(
      <ThemeProvider>
        <AuthProvider>
          <LanguageProvider>
            <GameProvider>
              <TimerProvider>
                <GameEventsProvider>
                  <CardsDeck isCardsRevealed={false} />
                </GameEventsProvider>
              </TimerProvider>
            </GameProvider>
          </LanguageProvider>
        </AuthProvider>
      </ThemeProvider>
    );
  });
});
