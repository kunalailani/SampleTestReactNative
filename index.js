import React, {Component} from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'
import App from './app/component/App';

import configureStore from './app/store.js'
const store = configureStore()

class SampleTestReactApp extends Component {
	render() {
		return (
			<Provider store={store}>
				<App />
			</Provider>
		)
	}
}

AppRegistry.registerComponent('SampleTestReactApp', () => SampleTestReactApp);
