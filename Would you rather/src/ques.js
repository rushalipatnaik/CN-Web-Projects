import {
    _saveQuestion,
    _saveQuestionAnswer
  } from './utils/_DATA';
  import {
    addAnswerAgainstUser,
    addQuestionAgainstUser
  } from './users';
  import {
    showLoading,
    hideLoading
  } from 'react-redux-loading-bar';
  
  import {
    GET_QUESTIONS,
    ADD_QUESTION,
    ADD_QUESTION_ANSWER
  } from './types';
  
  export const getQuestions = (questions) => ({
    type: GET_QUESTIONS,
    questions,
  });
  
  export const handleSaveQuestion = (optionOneText, optionTwoText, navigate) => (dispatch, getState) => {
    const {
      authenticatedUser
    } = getState();
    dispatch(showLoading());
    return _saveQuestion({
        author: authenticatedUser,
        optionOneText,
        optionTwoText,
      })
      .then((question) => {
        dispatch(addQuestion(question))
        dispatch(addQuestionAgainstUser(question.id, authenticatedUser))
        dispatch(hideLoading());
      })
      .then(() => navigate('/'))
  }
  
  export const addQuestion = (question) => ({
    type: ADD_QUESTION,
    question,
  });
  
  export const handleAddAnswer = (authenticatedUser, qid, answer) => (dispatch) => _saveQuestionAnswer({
      authenticatedUser,
      qid,
      answer,
    })
    .then(() => {
      dispatch(saveQuestionAnswer(authenticatedUser, qid, answer))
      dispatch(addAnswerAgainstUser(authenticatedUser, qid, answer))
    });
  
  export const saveQuestionAnswer = (authenticatedUser, qid, answer) => ({
    type: ADD_QUESTION_ANSWER,
    authenticatedUser,
    qid,
    answer,
  });
  