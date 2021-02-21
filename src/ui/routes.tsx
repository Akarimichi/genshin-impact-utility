import React from 'react';
import { Route, Switch } from 'react-router';
import Home from './home';
import Achievements from './achievements';
import NoMatch from './nomatch';

const Routes = (
    <>
        <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/achievements" component={Achievements} />
            <Route component={NoMatch} />
        </Switch>
    </>
);

export default Routes;
