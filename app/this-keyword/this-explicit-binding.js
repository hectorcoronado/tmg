// explicit binding

/**
  * `call()`
  */

var sayName = function () {
    console.log('my name is ' + this.name)
}

var stacey = {
    name: 'stacey',
    age: 34
}

// the `call()` method is in the function's prototype, so one can use it for any & all functions
// `this.name` refers to the stacey object's name property

sayName.call(stacey) // -> `my name is stacey`

var languages = ['javascript', 'ruby', 'python']

/**
  * the first argument to `call()` is going to be the function's execution context, and
  * any subsequent args we pass to it will be handled as normal arguments
  */
var sayNameAndLanguages = function (lang1, lang2, lang3) {
    console.log('my name is ' + this.name + ' and i know ' + lang1 + ', ' + lang2 + ', and ' + lang3)
}

sayNameAndLanguages.call(stacey, languages[0], languages[1], languages[2])
// -> 'my name is stacey and i know javascript, ruby, and python'


/**
  * `apply()`
  * 
  * ...the above is not a super awesome way of doing things, which is why we have `apply()`
  */

sayNameAndLanguages.apply(stacey, languages)
// -> 'my name is stacey and i know javascript, ruby, and python'

/**
  * `bind()`
  * 
  * almost the exact same thing as `call()`, 'cept it'll return a new function, instead
  * of invoking the original function, so...
  */

var boundFunction = sayNameAndLanguages.bind(stacey, languages[0], languages[1], languages[2])

console.log('just to prove a point')

boundFunction()
// -> just to prove a point
// -> my name is stacey and i know javascript, ruby, and python'
