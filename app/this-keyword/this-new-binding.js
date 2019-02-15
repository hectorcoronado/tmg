// new binding

/**
  * when a constructor func is invoked with the `new` keyword, 
  * the `this` keyword/context is bound to the new object being
  * constructed, in our case the `zebra` instance
  */
var Animal = function(color, name, type) {
    this.color = color
    this.name = name
    this.type = type
    console.log(this.color)
}

var zebra = new Animal('black and white', 'zorro', 'zebra')

console.log(zebra)

/**
  * if we run this file, we'll see the following output in the console
  * // -> black and white
  * // -> Animal { color: 'black and white', name: 'zorro', type: 'zebra' }
  */