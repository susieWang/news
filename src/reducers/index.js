'use strict';

import { combineReducers } from 'redux';

import list from './listReducer';
const rootReducer = combineReducers({
    list
})

export default rootReducer