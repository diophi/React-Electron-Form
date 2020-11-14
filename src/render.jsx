import React from 'react';
import ReactDOM from 'react-dom';
import {AppContainer} from 'react-hot-loader';

const render = () => {
  const App = require('./app/app.jsx').default;
  ReactDOM.render(<AppContainer><App/></AppContainer>, document.getElementById('app'));
}

render();
if (module.hot) {
  module.hot.accept(render);
}