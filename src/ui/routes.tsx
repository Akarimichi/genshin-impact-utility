import React from 'react';
import { Route, Switch, Redirect } from 'react-router';
import Home from './home';
import Achievements from './achievements';
import NoMatch from './nomatch';

const Routes = (
    <>
        <Switch>
            <Route exact path="/:locale(en|fr)/" component={Home} />
            <Route path="/:locale(en|fr)/achievements" component={Achievements} />
            <Route render={({ location }) => location.pathname === '/' ? <Redirect to="/en" /> : <Route component={NoMatch} />} />
        </Switch>
    </>
);

export default Routes;
