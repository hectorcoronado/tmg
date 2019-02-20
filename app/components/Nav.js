var React = require('react')
var Link = require('react-router-dom').Link
var NavLink = require('react-router-dom').NavLink

function Nav () {
    return (
        <ul className='nav'>
            <li>
                <NavLink exact activeClassName='active' to='/'>home</NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/battle'>battle</NavLink>
            </li>
            <li>
                <NavLink activeClassName='active' to='/popular'>popular</NavLink>
            </li>
        </ul>
    )
}

module.exports = Nav