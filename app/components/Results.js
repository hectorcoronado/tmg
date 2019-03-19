var React = require('react')
var PropTypes = require('prop-types')
var queryString = require('query-string')
var Link = require('react-router-dom').Link

var PlayerPreview = require('./PlayerPreview')

var api = require('../utils/api')

function Profile (props) {
    var info = props.info

    return (
        <PlayerPreview
            avatar={info.avatar_url}
            username={info.login}
        >
            <ul className='space-list-items'>
                {info.name && <li>{info.name}</li>}
                {info.location && <li>{info.location}</li>}
                {info.company && <li>{info.company}</li>}
                <li>followers: {info.followers}</li>
                <li>following: {info.following}</li>
                <li>public repos: {info.public_repos}</li>
                {info.blog && <li><a href={info.blog}>{info.blog}</a></li>}
            </ul>
        </PlayerPreview>
    )
}

Profile.propTypes = {
    info: PropTypes.object.isRequired
}

function Player (props) {
    return (
        <div>
            <h1 className='header'>{props.label}</h1>
            <h3 style={{textAlign: 'center'}}>score: {props.score}</h3>
            <Profile 
                info={props.profile}
            />
        </div>
    )
}

class Results extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            winner: null,
            loser: null,
            error: null,
            loading: true
        }
    }

    componentDidMount() {
        var players = queryString.parse(this.props.location.search)

        /**
         * pass in the results from the above `queryString.parse` function to `api.battle`
         * 
         * it returns a `Promise`, so we call `then`, which returns an array with the first
         * element being the winner, second the loser.
         */
        api.battle([
            players.playerOneName,
            players.playerTwoName
        ]).then(function (results) {
            /**
             * in `api`, we define `battle` and if its `catch` function runs, then we got an
             * error and `results` is set to `null`, so we can use that here:
             */
            if (results === null) {
                return this.setState(function() {
                    return {
                        error: 'looks like there was an error. check that both users exist on github',
                        loading: false
                    }
                })
            }

            this.setState(function() {
                return {
                    error: null,
                    winner: results[0],
                    loser: results[1],
                    loading: false
                }
            })
        }.bind(this)) // bind `this` so that it's the same within the function
    }

    render () {
        var error = this.state.error
        var winner = this.state.winner
        var loser = this.state.loser
        var loading = this.state.loading

        if (loading) {
            return <p>loading</p>
        }

        if (error) {
            return (
                <div>
                    <p>{error}</p>
                    <Link to='/battle'>reset</Link>
                </div>
            )
        }

        return (
            <div className='row'>
                <Player
                    label='winner'
                    score={winner.score}
                    profile={winner.profile}
                />
                <Player
                    label='loser'
                    score={loser.score}
                    profile={loser.profile}
                />
            </div>
        )
    }   
}

module.exports = Results