import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import GameBoard from 'domains/GameBoard';
import GameHistory from 'domains/GameHistory';
import Registration from 'domains/Registration';
import Login from 'domains/Login/Login';
import Leaderboard from 'domains/Leaderboard';
import UserProfile from 'domains/UserProfile';
import AppSettings from 'domains/AppSettings';
import { useAuthState } from 'context/AuthContext';

const AuthOnlyRoute = ({ children, ...args }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route {...args}>
      {isAuthenticated ? children : <Redirect to={{ pathname: '/login' }} />}
    </Route>
  );
};

const UnAuthOnlyRoute = ({ children, ...args }) => {
  const { isAuthenticated } = useAuthState();

  return (
    <Route {...args}>
      {!isAuthenticated ? children : <Redirect to={{ pathname: '/game' }} />}
    </Route>
  );
};

export const useRoutes = () => {
  const initRoutes = () => {
    return (
      <Switch>
        <Route path="/game">
          <GameBoard />
        </Route>
        <Route path="/leaderboard">
          <Leaderboard />
        </Route>
        <Route path="/settings">
          <AppSettings />
        </Route>
        <UnAuthOnlyRoute path="/registration">
          <Registration />
        </UnAuthOnlyRoute>
        <UnAuthOnlyRoute path="/login">
          <Login />
        </UnAuthOnlyRoute>
        <AuthOnlyRoute path="/profile">
          <UserProfile />
        </AuthOnlyRoute>
        <AuthOnlyRoute path="/history">
          <GameHistory />
        </AuthOnlyRoute>
        <Redirect to={{ pathname: '/game' }} />
      </Switch>
    );
  };

  return { initRoutes };
};
