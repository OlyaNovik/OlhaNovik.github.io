import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevToolsDevelopmentOnly } from "@redux-devtools/extension";
import ReducerInfo from "../Redux/Reducer/ReducerInfo"
import thunk from "redux-thunk";


const rootReducer = combineReducers({
  info: ReducerInfo,
});

const composeEnhancers = composeWithDevToolsDevelopmentOnly({
  trace: true,
  traceLimit: 25,
});

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export default store;