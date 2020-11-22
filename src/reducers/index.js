import { combineReducers } from 'redux'
import authReducer from './authReducer'
import streamReducer from './streamReducer'
import { reducer as formReducer } from 'redux-form' //importirat ćemo ugrađenog reducera za formular
//ako želimo renejmat named export to možemo napravit ovako gore

export default combineReducers({
    auth: authReducer,
    form: formReducer, //i moramo ga bindat baš za "form" property
    streams: streamReducer
})