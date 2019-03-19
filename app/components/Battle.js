var React = require('react')
var PropTypes = require('prop-types')
var Link = require('react-router-dom').Link

var PlayerPreview = require('./PlayerPreview')

var api = require('../utils/api')

class PlayerInput extends React.Component {
    constructor (props) {
        super (props)

        this.state = {
            username: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        var value = e.target.value

        this.setState(function () {
            return {
                username: value
            }
        })
    }

    handleSubmit (e) {
        e.preventDefault()

        this.props.onSubmit(this.props.id, this.state.username)
    }

    render () {
        return (
            <form 
                className='column'
                onSubmit={this.handleSubmit}>
                <label className='header' htmlFor='username'>
                    {this.props.label}
                </label>
                <input
                    autoComplete='off'
                    id='username'
                    onChange={this.handleChange}
                    placeholder='github username'
                    type='text'
                    value={this.state.username}
                />
                <button
                    className='button'
                    type='submit'
                    disabled={!this.state.username}>
                    submit
                </button>
            </form>
        )
    }
}

PlayerInput.propType = {
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired  
}

class Battle extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            playerOneName: '',
            playerTwoName: '',
            playerOneImage: null,
            playerTwoImage: null
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleReset = this.handleReset.bind(this)
    }

    /**
      * @param {id} string playerOne || playerTwo
      * @param {username} string player's github username
      */
    handleSubmit (id, username) {
        // `this` needs to refer to the **instance** of the component, so this fn is bound in constructor
        this.setState(function () {
            var newState = {}

            newState[id + 'Name'] = username
            newState[id + 'Image'] = 'https://github.com/' + username + '.png?size=200'

            return newState
        })
    }

    handleReset (id) {
        this.setState(function () {
            var newState = {}

            newState[id + 'Name'] = ''
            newState[id + 'Image'] = null

            return newState
        })
    }

    render () {
        var match = this.props.match
        var playerOneName = this.state.playerOneName
        var playerTwoName = this.state.playerTwoName
        var playerOneImage = this.state.playerOneImage
        var playerTwoImage = this.state.playerTwoImage

        return (
            <div>
                <div className='row'>
                    {!playerOneName &&
                        <PlayerInput
                            id='playerOne'
                            label='player one'
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerOneImage !== null &&
                        <PlayerPreview
                            avatar={playerOneImage}
                            username={playerOneName}
                        >
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerOne')}>
                                reset
                            </button>
                        </PlayerPreview>
                    }

                    {!playerTwoName &&
                        <PlayerInput
                            id='playerTwo'
                            label='player two'
                            onSubmit={this.handleSubmit}
                        />
                    }

                    {playerTwoImage !== null &&
                        <PlayerPreview
                            avatar={playerTwoImage}
                            username={playerTwoName}
                        >
                            <button
                                className='reset'
                                onClick={this.handleReset.bind(null, 'playerTwo')}>
                                reset
                            </button>
                        </PlayerPreview>
                    }
                </div>

                {playerOneImage && playerTwoImage &&
                    <Link
                        className='button'
                        to={{
                            pathname: match.url + '/results',
                            search: '?playerOneName=' + playerOneName + '&playerTwoName=' + playerTwoName
                        }}>
                        battle
                    </Link>
                }
            </div>
        )
    }
}

module.exports = Battle