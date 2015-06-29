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


Function reference
------------------

### `var generator = arbit(seed)`

The package itself is just a single function which returns a number
generator using the provided seed. The seed can be any string.


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


Why *arbit*?
------------

### Reproducibility

This library provides guaranteed reproducibility of observed sequences
of numbers, given that you supply the same state to the PRNG. This is
not possible with `Math.random`.


### Simplicity

*arbit* is very small but provides additional functions for getting
random ranges and integers.


### Quality

![Dilbert on randomness](http://i.imgur.com/Hn206vE.jpg)

It's very difficult to reason about what is random and what is not,
especially as a human being (we tend to see patterns where there are
none). Some important qualities to look for in a PRNG are:

* No predictable/repeating patterns
* Even distribution of numbers (no number is more likely than another)
* Number of possible unique patterns that can be generated


#### Verifying the quality

In this repo you will find the script `dieharder.bash`. Running it will
generate a ~5 GB file sampling numbers from *arbit*, then pass it on to
[Dieharder](http://www.phy.duke.edu/~rgb/General/dieharder.php) which
will test the quality of the output (how unpredictable it is).

Compared to `Math.random`, *arbit* scores better in terms of randomness
quality.

Before you can run the script, you need to install Dieharder. If you
have [Homebrew](http://brew.sh/) installed, doing so is easy:

```bash
brew install dieharder
```

You can now run the test:

```bash
./dieharder.bash
```

Have a look at [an example output][dieharder_arbit]. You can compare
this to [`Math.random`'s output][dieharder_math].


### Performance

The goal of this library is to provide simple, good, reproducible, and
performant pseudo-random number generation. Here is a benchmark between
`Math.random` and *arbit*, running on Node.js (v0.12.5):

```
arbit x 55,539,526 ops/sec ±3.12% (93 runs sampled)
Math.random x 62,497,530 ops/sec ±1.02% (93 runs sampled)
```


[dieharder_arbit]: https://gist.github.com/blixt/f4e52366d2b6517e94d6
[dieharder_math]: https://gist.github.com/blixt/96667468b2b82f0f8396
