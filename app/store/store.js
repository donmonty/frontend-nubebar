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
  createTotalCountReducer,
  getCountSummaryReducer,
  setCountActiveReducer, 
  getBottleCountDetailsReducer, 
  updateBottleWeightReducer, 
  updateBottleStateReducer, 
  countIdReducer, 
  countPendingSummaryReducer, 
  countSummaryTypeReducer,
  countDoneSummaryReducer,
  pendingBottlesReducer,
  doneBottlesReducer,
  bottleCountsReducer,
  closeCountReducer,
} from './reducers/countReducers'

import {
  getYieldReportReducer,
  getYieldReportsReducer,
  setYieldReportIdReducer,
  getYieldSalesDataReducer,
  setYieldIdReducer,
} from './reducers/yieldReducers'

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
  countSummary: getCountSummaryReducer,
  countActive: setCountActiveReducer,
  bottle: getBottleCountDetailsReducer,
  updatedBottle: updateBottleWeightReducer,
  bottleState: updateBottleStateReducer, 
  countId: countIdReducer,
  countPendingSummary: countPendingSummaryReducer,
  countDoneSummary: countDoneSummaryReducer,
  countSummaryType: countSummaryTypeReducer,
  pendingBottlesList: pendingBottlesReducer,
  doneBottlesList: doneBottlesReducer,
  bottleCounts: bottleCountsReducer,
  countState: closeCountReducer,
  yieldReport: getYieldReportReducer,
  yieldReports: getYieldReportsReducer,
  yieldReportId: setYieldReportIdReducer,
  yieldSalesData: getYieldSalesDataReducer,
  yieldId: setYieldIdReducer,
})

const middleware = [thunk]

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store