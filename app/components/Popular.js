var React = require('react')
var PropTypes = require('prop-types')

function SelectLanguage (props) {
    // console.log(this) // -> undefined
    var languages = ['all', 'javascript', 'ruby', 'java', 'css', 'python']

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

class Popular extends React.Component {
    constructor (props) {
        super()
        
        this.state = {
            selectedLanguage: 'all'
        }

        this.updateLanguage = this.updateLanguage.bind(this)
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
                selectedLanguage: lang
            }
        })
    }

    render () {
        // console.log('up here', this) // -> Popular
        return (
            <div>
                <SelectLanguage
                    selectedLanguage={this.state.selectedLanguage}
                    onSelect={this.updateLanguage}
                />
            </div>
        )
    }
}

module.exports = Popular