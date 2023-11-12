import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Leaderboard from './components/Leaderboard';
import NewQuestion from './components/NewQues';
import Question from './components/Question';
import Page404 from './components/NotFound';
import { handleInitialData } from './share';
import { setAuthenticatedUser } from './authenticatedUser';
import { ProtectedRoute } from './components/ProtectedRoute';
import LoadingBar from 'react-redux-loading-bar';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
    this.props.dispatch(setAuthenticatedUser());
  }

  render() {
    const {authenticatedUser  } = this.props;
    const HomeComponent = authenticatedUser === null ? Login : Home;

    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <section className="hero">
            <div className="hero-body">
              <div className="container has-text-centered">
                {authenticatedUser && <Navbar dispatch={this.props.dispatch} />}
                <Routes>
                  <Route path="/" element={<HomeComponent />} />
                  <Route
                    path="/question/:id"
                    element={<ProtectedRoute element={<Question />} authenticatedUser={authenticatedUser} />}
                  />
                  <Route
                    path="/leaderboard"
                    element={<ProtectedRoute element={<Leaderboard />} authenticatedUser={authenticatedUser} />}
                  />
                  <Route
                    path="/add"
                    element={<ProtectedRoute element={<NewQuestion />} authenticatedUser={authenticatedUser} />}
                  />
                  <Route path="*" element={<Page404 />} />
                </Routes>
              </div>
            </div>
          </section>
        </Fragment>
      </Router>
    );
  }
}

const mapStateToProps = ({ authenticatedUser, users }) => ({
  authenticatedUser,
  users,
});

export default connect(mapStateToProps)(App);
