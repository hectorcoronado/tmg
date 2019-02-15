var React = require('react')

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
        var languages = ['all', 'javascript', 'ruby', 'java', 'css', 'python']
        // console.log('up here', this) // -> Popular
        /**
          * in order to avoid a typical problem when using `map`, we need to declare
          * the context under which it should run
          * 
          * the first argument to `map` will be the function we want to execute for each
          * element in whatever array it's using, and the second will be `this` 
          */

        return (
            <ul className='languages'>
                {languages.map(function(lang) {
                    // console.log('down here', this) // -> Window, if we don't pass in `this` as 2nd argument to `map`! Otherwise // -> Popular :)
                    return (
                        <li
                            style={lang === this.state.selectedLanguage ? { color: '#d0021b' } : null }
                            key={lang}
                            onClick={this.updateLanguage.bind(null, lang)}>
                            {lang}
                        </li>
                    )
                }, this)}
            </ul>
        )
    }
}

module.exports = Popular