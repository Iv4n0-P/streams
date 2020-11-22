import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import reduxThunk from 'redux-thunk'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))
//const store = createStore(reducers) //ne ovo nego ovo gore ako želimo koristit redux dev tools u browseru


ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.querySelector('#root'))