var React = require('react')
var PropTypes = require('prop-types')

var Loading = require('./Loading')

var api = require('../utils/api')

function SelectLanguage (props) {
    // console.log(this) // -> undefined
    var languages = ['all', 'javascript', 'rust', 'go', 'css', 'python', 'wasm']

    return (
        <ul className='languages'>
            {languages.map(function(lang) {
                return (
                    <li
                        style={lang === props.selectedLanguage ? { color: '#d0021b' } : null }
                        key={lang}
                        onClick={props.onSelect.bind(null, lang)}>
                            {lang}
                    </li>
                )
            })}
        </ul>
    )
}

SelectLanguage.propTypes = {
    selectedLanguage: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired
}

function RepoGrid (props) {
    return (
        <ul className='popular-list'>
            {props.repos.map(function (repo, idx) {
                return(
                    <li key={repo.name} className='popular-item'>
                        <div className='popular-rank'>#{idx + 1}</div>
                        <ul className='space-list-items'>
                            <li>
                                <img
                                    className='avatar'
                                    src={repo.owner.avatar_url}
                                    alt={'Avatar for ' + repo.owner.login}
                                />
                                <ul>
                                    <li><a href={repo.html_url}>{repo.name}</a></li>
                                    <li>@{repo.owner.login}</li>
                                    <li>{repo.stargazers_count} stars</li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                )
            })}
        </ul>
    )
}

RepoGrid.propTypes = {
    repos: PropTypes.array.isRequired
}

class Popular extends React.Component {
    constructor (props) {
        super()
        
        this.state = {
            repos: null,
            selectedLanguage: 'all'
        }

        this.updateLanguage = this.updateLanguage.bind(this)
    }

    componentDidMount () {
        this.updateLanguage(this.state.selectedLanguage)
    }
    
    /**
      * since we don't know what the `this` keyword will be bound to
      * until `updateLanguage` is invoked, we can `bind` it in our
      * `constructor`; we need to bind it to the created instance of this
      * component which will always have a `setState` property
      */
    updateLanguage (lang) {
        this.setState(function () {
            return {
                repos: null,
                selectedLanguage: lang
            }
        })

        api.fetchPopularRepos(lang)
            .then(function (repos) {
                this.setState(function () {
                    return {
                        repos: repos
                    }
                })
            }.bind(this)) // we've created a new function, but want to retain correct executing context
    }

    render () {
        // console.log('up here', this) // -> Popular
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />

                {this.state.repos ? <RepoGrid repos={this.state.repos} /> : <Loading />}
            </div>
        )
    }
}

module.exports = Popular