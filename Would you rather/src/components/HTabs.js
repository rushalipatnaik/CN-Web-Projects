import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Link } from 'react-router-dom';
import 'react-tabs/style/react-tabs.css';
import { connect } from 'react-redux';

const compare = (a, b) => b[1].timestamp - a[1].timestamp;

const HTabs = ({ unanswerdQuestions, answeredQuestions, users }) => {
  return (
    <Tabs>
      <TabList>
        <Tab>Unanswered Questions</Tab>
        <Tab>Answered Questions</Tab>
      </TabList>

      <TabPanel>
        <div className="columns is-centered leadboard">
          <div className="column is-7 has-background-white-ter">
            {unanswerdQuestions.sort(compare).map((question, index) => (
              <div key={index} className="card leadboard-panel">
                <header className="header has-background-primary">
                  <p className="card-header-title has-text-light"> Asked By: {users[question[1].author].name} </p>
                </header>
                <div className="card-content">
                  <div className="content columns">
                    <div className="column is-3">
                      <figure className="image is-96x96">
                        <img className="is-rounded" src={users[question[1].author].avatarURL} alt="dp" />
                      </figure>
                    </div>
                    <div className="column">
                      <h6 className="has-text-left">Would you rather?</h6>
                      <div className="list">
                        <li className="list-item">{question[1].optionOne.text}</li>
                        <li className="list-item">{question[1].optionTwo.text}</li>
                      </div>
                      <div className="is-pulled-left">
                        <Link className="button is-dark" to={`/question/${question[1].id}`}>
                          Answer
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>

      <TabPanel>
        <div className="columns is-centered leadboard">
          <div className="column is-7 has-background-white-ter">
            {answeredQuestions.sort(compare).map((question, index) => (
              <div key={index} className="card leadboard-panel">
                <header className="header has-background-primary">
                  <p className="card-header-title has-text-light"> Asked By: {users[question[1].author].name} </p>
                </header>
                <div className="card-content">
                  <div className="content columns">
                    <div className="column is-3">
                      <figure className="image is-96x96">
                        <img className="is-rounded" src={users[question[1].author].avatarURL} alt="dp" />
                      </figure>
                    </div>
                    <div className="column">
                      <h6 className="has-text-left">Would you rather?</h6>
                      <div className="list">
                        <li className="list-item">{question[1].optionOne.text}</li>
                        <li className="list-item">{question[1].optionTwo.text}</li>
                      </div>
                      <div className="is-pulled-left">
                        <Link className="button is-dark" to={`/question/${question[1].id}`}>
                          View Results
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </TabPanel>
    </Tabs>
  );
};

const mapStateToProps = ({ questions, users, authenticatedUser }) => {
  const unanswerdQuestions = Object.entries(questions).filter(
    (question) => !question[1].optionOne.votes.includes(authenticatedUser) && !question[1].optionTwo.votes.includes(authenticatedUser)
  );

  const answeredQuestions = Object.entries(questions).filter(
    (question) => question[1].optionOne.votes.includes(authenticatedUser) || question[1].optionTwo.votes.includes(authenticatedUser)
  );

  return {
    unanswerdQuestions,
    answeredQuestions,
    users,
    authenticatedUser,
  };
};

export default connect(mapStateToProps)(HTabs);
