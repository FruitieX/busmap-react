import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import persistStore from './persist';
import { Provider } from 'react-redux';
import store from './store';


class Container extends React.Component {
  state = {
    isReady: false,
  };

  componentDidMount = async () => {
    await persistStore(store);
    this.setState({ isReady: true });
  };

  render() {
    if (!this.state.isReady) return null;

    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}

ReactDOM.render(<Container />, document.getElementById('root'));
registerServiceWorker();
