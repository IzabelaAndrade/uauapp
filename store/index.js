import { createStore } from "redux";

import rootReducer from './modules/rootReduce'

const store = createStore(rootReducer);

export default store;
