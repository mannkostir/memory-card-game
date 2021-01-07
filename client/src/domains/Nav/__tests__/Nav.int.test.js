import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';
import Nav from '../Nav';
import { AuthProvider } from 'context/AuthContext';
import { LanguageProvider } from 'context/LanguageContext';

describe('Nav', () => {
  // test('click through every link O_O', () => {
  //   render(
  //     <AuthProvider>
  //       <LanguageProvider>
  //         <Nav />
  //       </LanguageProvider>
  //     </AuthProvider>
  //   );

  //   const links = screen.queryAllByRole('link');

  //   for (let link of links) {
  //     userEvent.click(link);
  //     expect(window.location.pathname).toEqual(link.getAttribute('href'));
  //   }
  // });
  test('test', () => {
    const { rerender } = render(
      <AuthProvider>
        <LanguageProvider>
          <Nav />
        </LanguageProvider>
      </AuthProvider>
    );

    rerender(
      <AuthProvider passedState={{ isAuthenticated: true }}>
        <LanguageProvider>
          <Nav />
        </LanguageProvider>
      </AuthProvider>
    );
  });
});
