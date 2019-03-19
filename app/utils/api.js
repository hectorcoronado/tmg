var axios = require('axios')

var id = 'YOUR_CLIENT_ID'
var sec = 'YOUR_SECRET_ID'
var params = '?client_id=' + id + '&client_secret=' + sec;

/**
  * @param { username } string
  * 
  * external request to get specific user and narrow response to `data`
  */
function getProfile (username) {
    return axios.get('https://api.github.com/users/' + username + params)
        .then(function(user) {
            return user.data
        })
}

/**
  * @param { username } string
  * 
  * external request to get 100 of a specific user's repos
  */
function getRepos (username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + params + '&per_page=100')
}

/**
  * @param { repos } array
  * 
  * no external requests, just sums total no. of stars for all of a user's repos
  */
function getStarCount (repos) {
    return repos.data.reduce(function (count, repo) {
        return count + repo.stargazers_count
    }, 0)
}

function calculateScore (profile, repos) {
    var followers = profile.followers
    var totalStars = getStarCount(repos)

    // calculate & return a players total score:
    return (followers * 3) + totalStars    
}

function handleError (error) {
    console.warn(error)
    return null
}

/**
 * @param { player } string
 * 
 * @return object w/`profile` & `score` 
 */
function getUserData (player) {
    /**
      * `axios.all` takes an array of `Promise`'s; once they all resolve, it calls
      * the `.then` function
      */
    return axios.all([
        getProfile(player),
        getRepos(player)
    ]).then(function (data) { // `data` is the array returned by call to `axios.all`, so:
        var profile = data[0] // `data[0]`: return value of getProfile(player), and...
        var repos = data[1] // `data[1]`: return value of getRepos(player)

        return {
            profile: profile,
            score: calculateScore(profile, repos)
        }
    })
}

/**
  * @param { players } array
  */
function sortPlayers(players) {
    /**
      * @return { array } the player with the higher score will be at index 0
      */
    var sortedPlayers =  players.sort(function (a, b) {
        return b.score - a.score
    })

    return sortedPlayers
}

module.exports = {
    /**
      * `battle` function:
      * 1. gets called with an array of 2 players; 
      * 2. we `map` over them and call `getUserData`
      * 3. returns a `Promise`; once it is resolved, it contains all players' information
      * 4. we then (`then`) call `sortPlayers` to get the winner
      * 
      * `battle` gets called in `Results` component, the return
      * value of `getUserData` is an object with a `profile` and
      * `score` property, and in `Results`, those are assigned to
      * each individual player via the usage of `map` below
      */
    battle: function (players) {
        return axios.all(players.map(getUserData))
            .then(sortPlayers)
            .catch(handleError)
    },

    fetchPopularRepos: function (language) {
        var encodedURI = window.encodeURI('https://api.github.com/search/repositories?q=stars:>1+language:' + language + '&sort=stars&order=desc&type=Repositories');

    // fetch info from encodeURI; returns a Promise
    return axios.get(encodedURI)
        .then(function (response) {
            return response.data.items
        })
    }
}