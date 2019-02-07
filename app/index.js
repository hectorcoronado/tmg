var React = require ('react')
var ReactDOM = require ('react-dom')

require('./index.css')

/**
 * component may be comprised of:
 * 1. state
 * 2. lifecycle events
 * 3. ui (this is the only more or less required one)
 */

class App extends React.Component {
    render() {
        return (
            <div>
                hello world.
            </div>
        )
    }
}

/**
  * ReactDOM.render() takes 2 args
  * 1. a react component
  * 2. a dom element to append the component onto
  */

ReactDOM.render(<App />, document.getElementById('app'))