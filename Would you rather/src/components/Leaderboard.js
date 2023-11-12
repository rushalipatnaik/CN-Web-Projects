import React from 'react';
import { connect } from 'react-redux';

const Leaderboard = ({ users }) => {
  const compare = (a, b) => {
    const aScore = Object.keys(a[1].answers).length + a[1].questions.length;
    const bScore = Object.keys(b[1].answers).length + b[1].questions.length;
    return bScore - aScore;
  };

  return (
    <div className="columns is-centered leaderboard">
      <div className="column is-8 has-background-white-ter">
        {Object.entries(users)
          .sort(compare)
          .map((user, index) => (
            <div key={index} className="card leaderboard-panel">
              <header className="header has-background-primary">
                <p className="card-header-title has-text-light">{user[1].name}</p>
              </header>
              <div className="card-content">
                <div className="content columns">
                  <div className="column is-3">
                    <figure className="image is-96x96">
                      <img className="is-rounded" src={user[1].avatarURL} alt="dp" />
                    </figure>
                  </div>
                  <div className="column is-5">
                    <div className="list leaderboard-stats">
                      <li className="list-item">
                        <span>{user[1].questions.length}</span> Questions Asked
                      </li>
                      <li className="list-item">
                        <span>{Object.keys(user[1].answers).length}</span> Questions Answered
                      </li>
                    </div>
                  </div>
                  <div className="column">
                    <div className="card">
                      <header className="header has-background-grey-lighter">
                        <p className="card-header-title is-centered"> Score </p>
                      </header>
                      <div className="card-content score-panel">
                        <p>{Object.keys(user[1].answers).length + user[1].questions.length}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  users: state.users,
});

export default connect(mapStateToProps)(Leaderboard);
