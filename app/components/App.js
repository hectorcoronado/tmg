var React = require('react')
var ReactRouter = require('react-router-dom')
var Router = ReactRouter.BrowserRouter
var Route = ReactRouter.Route
var Switch = ReactRouter.Switch

var Battle = require('./Battle')
var Home = require('./Home')
var Popular = require ('./Popular')
var Nav = require('./Nav')
var Results = require('./Results')

/**
 * component may be comprised of:
 * 1. state
 * 2. lifecycle events
 * 3. ui (this is the only more or less required one)
 */

class App extends React.Component {
    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/battle' component={Battle} />
                        <Route path='/battle/results' component={Results} />
                        <Route path='/popular' component={Popular} />
                        <Route render={function () {
                            return <p>not found</p>
                        }} />
                    </Switch>
                </div>
            </Router>
        )
    }
}

module.exports = App