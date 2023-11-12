import { getQuestions } from './ques';
import { getUsers } from './users';
import { _getUsers, _getQuestions } from './utils/_DATA';

export const handleInitialData = () => (dispatch) => {
  Promise.all([_getUsers(), _getQuestions()])
    .then(([users, questions]) => {
      dispatch(getUsers(users));
      dispatch(getQuestions(questions));
    });
};
