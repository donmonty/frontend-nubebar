import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
  productDetailsReducer
} from "./reducers/productReducers"
import {
  bottleDetailsReducer
} from "./reducers/bottleReducers"

import { locationListReducer } from "./reducers/locationReducers"

const reducer = combineReducers({
  productDetails: productDetailsReducer,
  bottleDetails: bottleDetailsReducer,
  locations: locationListReducer 
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store