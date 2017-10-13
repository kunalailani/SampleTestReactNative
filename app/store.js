import { createStore, applyMiddleware } from 'redux';
import reducer from './reducer'
import thunk from 'redux-thunk';

export default function configureStore() {
  let store = createStore(
    reducer,
    applyMiddleware(thunk)
  )

  return store
}