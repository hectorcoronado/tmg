var React = require('react')

var Popular = require ('./Popular')

/**
 * component may be comprised of:
 * 1. state
 * 2. lifecycle events
 * 3. ui (this is the only more or less required one)
 */

class App extends React.Component {
    render() {
        return (
            <div className='container'>
                <Popular />
            </div>
        )
    }
}

module.exports = App