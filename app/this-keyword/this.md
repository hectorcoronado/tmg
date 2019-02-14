### There are 4 types of bindings that can be done with the `this` keyword

1. implicit binding -- this is the most common and can be summarized as:
    - left of the dot at call time
2. explicit binding
    - this is done via invocations to `call()`, `apply()`, or `bind()`
3. new binding
4. window binding

### First question to pose when figuring out what `this` is in any given context is:

Where is the function **invoked**?

(Not when or where was it defined.)