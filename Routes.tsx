import { Component } from "react";
import { Route, Switch, Router } from "react-router-dom";
import React from "react";

import createHistory from 'history/createBrowserHistory';

import App from './App'
import Favorites from "./pages/favorites";

const history = createHistory();

class Routes extends Component{
    render (){
        return(
            <Router history={history}>
                <Switch>
                    <Route exact path="/" component={App} />
                    <Route exact path='/favorites' component={Favorites}/>
                </Switch>   
            </Router>
        

        )
    }
}
export default Routes