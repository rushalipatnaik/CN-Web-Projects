import React from 'react';

const QuestionResult = ({ question, users, authenticatedUser }) => {
  const { author, optionOne, optionTwo } = question;
  const { name, avatarURL } = users[author];

  const optionOneSelected = optionOne.votes.includes(authenticatedUser);
  const optionTwoSelected = optionTwo.votes.includes(authenticatedUser);

  const optionOneVotes = optionOne.votes.length;
  const optionTwoVotes = optionTwo.votes.length;
  const totalVotes = optionOneVotes + optionTwoVotes;

  const percentageCalculator = (part, total) => {
    return (part / total) * 100;
  };

  return (
    <div className="columns is-centered question-result">
      <div className="column is-7 has-background-white-ter">
        <div className="card question-result-panel">
          <header className="header has-background-primary">
            <p className="card-header-title has-text-light">{name} Asked</p>
          </header>
          <div className="card-content">
            <div className="content columns">
              <div className="column is-3">
                <figure className="image is-96x96">
                  <img className="is-rounded" src={avatarURL} alt="dp" />
                </figure>
              </div>
              <div className="column">
                <h6 className="has-text-left">Would you rather?</h6>
                <div className="list">
                  <li
                    className={`list-item  ${
                      optionOneSelected && 'has-background-white-ter'
                    }`}
                  >
                    Would you rather {optionOne.text}?
                    {optionOneSelected && <SelectionBadge />}
                    <div>
                      <progress
                        className="progress is-small"
                        value={percentageCalculator(optionOneVotes, totalVotes)}
                        max="100"
                      >
                        {percentageCalculator(optionOneVotes, totalVotes)}
                      </progress>
                    </div>
                    <div className="has-text-right">
                      <span className="tag is-info">{`${optionOneVotes} out of ${totalVotes}`} votes</span>
                    </div>
                  </li>
                  <li
                    className={`list-item  ${
                      optionTwoSelected && 'has-background-white-ter'
                    }`}
                  >
                    Would you rather {optionTwo.text}?
                    {optionTwoSelected && <SelectionBadge />}
                    <div>
                      <progress
                        className="progress is-small"
                        value={percentageCalculator(optionTwoVotes, totalVotes)}
                        max="100"
                      >
                        {percentageCalculator(optionTwoVotes, totalVotes)}
                      </progress>
                    </div>
                    <div className="has-text-right">
                      <span className="tag is-info">{`${optionTwoVotes} out of ${totalVotes}`} votes</span>
                    </div>
                  </li>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const SelectionBadge = () => (
  <span className="selection-badge is-pulled-right">
    <i className="fa fa-check-circle"> </i>
    You Chose
  </span>
);

export default QuestionResult;
