arbit
=====

A tiny pseudo-random number generator.


Example
-------

```javascript
var arbit = require('arbit');

var random = arbit();

var HIT_CHANCE = 0.75;
var MIN_DAMAGE = 15, MAX_DAMAGE = 21;

if (random() <= HIT_CHANCE) {
  var damage = random.nextInt(MIN_DAMAGE, MAX_DAMAGE + 1);
  console.log('You hit the zombie for %d damage!', damage);
} else {
  console.log('You missed!');
}
```


Functions
---------

### `var generator = arbit(seed)`

The package itself is just a single function which returns a number
generator using the provided seed.


### `var generator = arbit.fromState(state)`

Returns a number generator initialized to be in the provided state.


### `var number = generator()`

Calling the generator itself returns a value greater than or equal to
zero, and less than one.


### `var number = generator.nextFloat(max)`

Returns a floating point that somewhere between zero and `max`. If a
negative number is provided, the range will instead be `(max, 0]`.


### `var number = generator.nextFloat(min, max)`

Returns a floating point number within either the range `[min, max)` or
`(max, min]` (if the range is reversed).


### `var number = generator.nextInt(max)`

Same as `nextFloat(max)`, but coerces the value to an integer with
`Math.floor`.


### `var number = generator.nextInt(min, max)`

Same as `nextFloat(min, max)`, but coerces the value to an integer with
`Math.floor`.


### `var state = generator.getState()`

Returns the current state of the generator. This can be passed into
`arbit.fromState(state)` to get back another generator in the same
state (i.e., it will generate the same sequence of numbers).
