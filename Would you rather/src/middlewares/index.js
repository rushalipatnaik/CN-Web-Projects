import { applyMiddleware, compose } from 'redux';
import ReduxThunk from 'redux-thunk';

// Use Redux DevTools Extension if available
const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;

// Apply middleware with Redux Thunk
const middleware = composeEnhancers(applyMiddleware(ReduxThunk));

export default middleware;
