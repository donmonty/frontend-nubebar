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
import { 
  bottleWeightReducer, 
  bottleCreateReducer, 
  bottleFolioReducer, 
  bottleCustomFolioReducer, 
  bottleCreateTypeReducer } from "./reducers/bottleReducers"
import { 
  quickCountsReducer, 
  totalCountsReducer, 
  countTypeReducer, 
  createQuickCountReducer, 
  createTotalCountReducer } from './reducers/countReducers'

const reducer = combineReducers({
  productDetails: productDetailsReducer,
  bottleDetails: bottleDetailsReducer,
  locations: locationListReducer,
  bottleWeight: bottleWeightReducer,
  bottleCreate: bottleCreateReducer,
  bottleFolio: bottleFolioReducer,
  bottleCustomFolio: bottleCustomFolioReducer,
  bottleCreateType: bottleCreateTypeReducer,
  quickCounts: quickCountsReducer,
  totalCounts: totalCountsReducer,
  countType: countTypeReducer,
  quickCountCreate: createQuickCountReducer,
  totalCountCreate: createTotalCountReducer, 
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store