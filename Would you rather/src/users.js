import { GET_USERS, ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from './types';

export const getUsers = (users) => ({
  type: GET_USERS,
  users,
});

export const addAnswerAgainstUser = (authenticatedUser, qid, answer) => ({
  type: ADD_ANSWER_TO_USER,
  authenticatedUser,
  qid,
  answer,
});

export const addQuestionAgainstUser = (qid, authenticatedUser) => ({
  type: ADD_QUESTION_TO_USER,
  qid,
  authenticatedUser,
});
