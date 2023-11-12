import { GET_USERS, ADD_ANSWER_TO_USER, ADD_QUESTION_TO_USER } from '../types';

const users = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_ANSWER_TO_USER:
      const { authenticatedUser, qid, answer } = action;
      return {
        ...state,
        [authenticatedUser]: {
          ...state[authenticatedUser],
          answers: {
            ...state[authenticatedUser].answers,
            [qid]: answer,
          },
        },
      };
    case ADD_QUESTION_TO_USER:
      const { authenticatedUser: addQuestionAuthedUser, id } = action;
      return {
        ...state,
        [addQuestionAuthedUser]: {
          ...state[addQuestionAuthedUser],
          questions: [...state[addQuestionAuthedUser].questions, id],
        },
      };
    default:
      return state;
  }
};

export default users;
