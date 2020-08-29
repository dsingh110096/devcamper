import './css/bootstrap.css';
import './css/style.css';
import React, { Fragment, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Bootcamps from './components/bootcamp/Bootcamps';
import Bootcamp from './components/bootcamp/Bootcamp';
import Reviews from './components/reviews/Reviews';
import AddReview from './components/reviews/AddReview';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import PrivateRoute from './components/routing/PrivateRoute';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

//Redux Store files
import { Provider } from 'react-redux';
import store from './store';

//Check if token in localStorage and set it to the header
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

function App() {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/bootcamps' component={Bootcamps} />
              <Route exact path='/bootcamps/:bootcampId' component={Bootcamp} />
              <Route exact path='/reviews/:bootcampId' component={Reviews} />
              <PrivateRoute
                exact
                path='/add-review/:bootcampId'
                component={AddReview}
              />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
