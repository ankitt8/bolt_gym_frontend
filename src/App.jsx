import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './containers/HomePage';
import AddFormLandingLoader from './components/AddFormLandingLoader';

const AddUserForm = React.lazy(() => import('./components/AddUser'));
function App() {
  return (
    <Suspense fallback={<AddFormLandingLoader />}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/add_user">
          <AddUserForm />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
