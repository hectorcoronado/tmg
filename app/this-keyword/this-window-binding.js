// window binding
var sayAge = function () {
    console.log(this.age)
}

var me = {
    age: 37
}

sayAge()

/**
  * if we wanted to call `sayAge()` with the context of `me`,
  * we'd have to bind it somehow, with `call()` for instance:
  * 
  * `sayAge.call(me)`
  * 
  * the way we're invoking it above, with nothing to the left of the
  * dot, and nothing explicitly bound to it, we'll just get
  * `undefined`
  * 
  * this is because the `this` keyword, by default, will refer to the
  * window object... so if we do the following
  */

window.age = 37

sayAge()

/**
  * in the console we now we get
  * 
  * // -> 37
  * 
  * this is pretty awful. we can avoid all this by running our code in
  * strict mode using `use strict`
  */

sayAge = function () {
    'use strict'
    console.log(this.age)
}

sayAge()

/**
  * assuming we had not defined an `age` property on the `window` object
  * above, this would now throw an error.
  * 
  * // -> Cannot read property 'age' of undefined
  */