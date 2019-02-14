// implicit binding 
var me = {
    name: 'hector',
    age: 37,
    sayName: function () {
        console.log(this.name)
    }
}

me.sayName()
// -> 'hector'

/**
  * if we pass an object to the mixin below, that object will then be decorated
  * with the `sayName` method
  */
var sayNameMixin = function (obj) {
    obj.sayName = function() {
        console.log(this.name)
    }
}

var her = {
    name: 'brenda',
    age: 29
}

var me = {
    name: 'hector',
    age: 37
}

sayNameMixin(me) // method attached to `me` obj
sayNameMixin(her) // ...and to `her` obj

me.sayName() // -> 'hector'
her.sayName() // -> 'brenda'

var Person = function (name, age) {
    return {
        name: name,
        age: age,
        sayName: function () {
            console.log(this.name)
        },
        mother: {
            name: 'lourdes',
            sayName: function () {
                console.log(this.name)
            }
        }
    }
}

var hector = Person('hector', 37)
hector.sayName() // -> 'hector'
hector.mother.sayName() // -> 'lourdes'