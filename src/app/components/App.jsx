import React from 'react'
import { Provider } from 'react-redux';
import { store } from "../store"
import { ConnectedDashboard } from "./Dashboard"
import { Route, Router } from "react-router"
import { history } from '../store/History';
import { ConnectedNavigation } from './Navigation'
import { ConnectedTaskDetail } from '../components/TaskDetails'
import { ConnectedLogin } from '../components/Login';
import { Redirect } from 'react-router';


const RouteGaurd = Component => ({match}) => {
   //Logic to check what component should be returned
   console.info("Route Gaurd", match)
   if(!store.getState().session.authenticated){
    return <Redirect to="/"/>
   }
   return <Component match={match} />
}


export const App = () => (
   <Router history={history}>

      <Provider store={store}>
         <div>
            {/* <ConnectedNavigation /> */}

            <Route exact path='/' component={ConnectedLogin} />
            <Route exact path="/Dashboard" render={RouteGaurd(ConnectedDashboard)} />
            <Route exact path='/taskDetail/:id' render={RouteGaurd(ConnectedTaskDetail)} />
         </div>

      </Provider>
   </Router>
);