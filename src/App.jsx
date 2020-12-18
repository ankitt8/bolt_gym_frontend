import React, { Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';
import Header from './components/Header';
import UsersList from './components/UsersList';
import HomePage from './containers/HomePage';
import AddFormLandingLoader from './components/AddFormLandingLoader';

const AddUserForm = React.lazy(() => import('./components/AddUser'));
const EditUser = React.lazy(() => import('./components/EditUser'));
function App() {
  return (
    <Suspense fallback={<AddFormLandingLoader />}>
      <Header />
      <Switch>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/users">
          <UsersList />
        </Route>
        <Route exact path="/add_user">
          <AddUserForm />
        </Route>
        <Route exact path="/edit_user">
          <EditUser />
        </Route>
      </Switch>
    </Suspense>
  );
}

export default App;
