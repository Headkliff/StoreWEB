import {combineReducers} from 'redux'
import userReducers from './userReducers'

const allReducers = combineReducers({
    user : userReducers
})

export default allReducers