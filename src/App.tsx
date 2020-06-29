import React, { useEffect } from 'react';
import { Provider, connect } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import './App.css';
import DynamicRouter from './components/dynamicrouter';
import routeReducer from './store/routeReducer';
import { setJourney } from './store/actions/journey';
import { JOURNEY } from './consts';
import { IJourney } from './interfaces/journeys';

const store = createStore(routeReducer, composeWithDevTools(
  applyMiddleware(thunk),
),
);

const App = (props: any) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <DynamicRouter />
      </BrowserRouter>
    </Provider>
  );
}

export default App;
