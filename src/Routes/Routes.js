import React from 'react'
import  {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import HomeView from '../View/HomeView'
import PersonalView from '../View/PersonalView'

function Routes(props) {
    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path='/User' component={PersonalView}/>
                <Route component={HomeView}/>
            </Switch>
        </Router>
    )
}
export default Routes