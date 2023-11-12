import { GET_QUESTIONS, ADD_QUESTION, ADD_QUESTION_ANSWER } from '../types';

const ques = (state = {}, action) => {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };
    case ADD_QUESTION_ANSWER:
      const { qid, authenticatedUser, answer } = action;
      return {
        ...state,
        [qid]: {
          ...state[qid],
          [answer]: {
            ...state[qid][answer],
            votes: [...state[qid][answer].votes, authenticatedUser],
          },
        },
      };
    default:
      return state;
  }
};

export default ques;
