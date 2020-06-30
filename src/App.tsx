import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import DynamicRouter from './components/dynamicrouter';
import routeReducer from './store/routeReducer';

const store = createStore(routeReducer, composeWithDevTools(
  applyMiddleware(thunk),
),
);

const App = (props: any) => {
  console.log("public: ", process.env.PUBLIC_URL)
  return (
    <Provider store={store}>
      <HashRouter>
        <DynamicRouter />
      </HashRouter>
    </Provider>
  );
}

export default App;
