import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import AnsQues from './AnsQues';
import Result from './Result';
import NotFound from './NotFound';

const Question = ({ questions, authenticatedUser, users }) => {
  const { id } = useParams();

  if (questions && questions[id]) {
    const question = questions[id];
    const answeredQuestion = question.optionOne.votes.includes(authenticatedUser) || question.optionTwo.votes.includes(authenticatedUser);

    return (
      answeredQuestion ?
        <Result question={question} users={users} authenticatedUser={authenticatedUser} />
        :
        <AnsQues question={question} users={users} authenticatedUser={authenticatedUser} />
    );
  } else {
    return (
      <NotFound msg="Poll doesn't exist." />
    );
  }
};

const mapStateToProps = ({ questions, authenticatedUser, users }) => ({
  questions,
  authenticatedUser,
  users,
});

export default connect(mapStateToProps)(Question);
