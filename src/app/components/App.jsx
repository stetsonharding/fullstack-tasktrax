import React from 'react'
import { Provider } from 'react-redux';
import {store} from "../store"
import {Dashboard} from "../components/Dashboard"
import {ConnectedDashboard} from "./Dashboard"

export const App = ()=>(
   <Provider store={store}>
   <ConnectedDashboard />
   </Provider>
);