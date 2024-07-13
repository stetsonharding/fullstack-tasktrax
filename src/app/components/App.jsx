import React from 'react'
import { Provider } from 'react-redux';
import { store } from "../store"
import { ConnectedDashboard } from "./Dashboard"
import { Route, Router } from "react-router"
import { history } from '../store/History';
import { ConnectedNavigation } from './Navigation'
import { ConnectedTaskDetail } from '../components/TaskDetails'

export const App = () => (
   <Router history={history}>

      <Provider store={store}>
         <div>
            <ConnectedNavigation />

            <Route exact path="/Dashboard" render={() => <ConnectedDashboard />} />
            <Route exact path='/taskDetail/:id' render={({ match }) => (<ConnectedTaskDetail match={match} />)} />
         </div>

      </Provider>
   </Router>
);