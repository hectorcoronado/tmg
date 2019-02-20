var React = require('react')

var Link = require('react-router-dom').Link

class Home extends React.Component {
    render () {
        return (
            <div className='home-container'>
                <h1>github battle: battle your friends... and stuff</h1>

                <Link className='button' to='/battle'>
                    battle
                </Link>
            </div>
        )
    }
}

module.exports = Home