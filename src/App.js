import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';

import Login from './components/Login';
import Register from './components/Register';
import PropertiesPage from './components/PropertiesPage';
import PropertyDetailsPage from './components/PropertyDetailsPage';
import { fetchProperties } from './actions';

function App() {
  const authenticated = useSelector(state => state.session?.authenticated);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authenticated) {
      dispatch(fetchProperties());
    }
  }, [authenticated, dispatch]);

  return (
      <Router>
        <Switch>
          {authenticated ? (
            <>
              <Route exact path="/properties">
                <PropertiesPage />
              </Route>
              <Route path="/properties/:id">
                <PropertyDetailsPage />
              </Route>
              <Redirect to="/properties" />
            </>
          ) : (
            <>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/register">
                <Register />
              </Route>
              <Redirect to="/login" />
            </>
          )}
        </Switch>
      </Router>
  );
}

export default App;
