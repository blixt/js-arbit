/**
 * Creates a pseudo-random value generator. Takes two floating point numbers
 * in the range [0, 1) for seeding the generator.
 *
 * This is an adapted version of Johannes Baagøe's Alea algorithm.
 * https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
 */
function alea(s0, s1, c) {
  var f = function aleaStep() {
    var t = 2091639 * s0 + c * 2.3283064365386963e-10;
    s0 = s1;
    return s1 = t - (c = t | 0);
  };

  f.getState = function aleaGetState() {
    return [s0, s1, c];
  };
  f.nextFloat = aleaNextFloat;
  f.nextInt = aleaNextInt;

  return f;
}

/**
 * Returns a pseudo-random floating point number in range [0, 1), or a custom
 * range, if specified. The lower bound is inclusive while the upper bound is
 * exclusive.
 */
function aleaNextFloat(opt_minOrMax, opt_max) {
  var value = this();

  var min, max;
  if (typeof opt_max == 'number') {
    min = opt_minOrMax;
    max = opt_max;
  } else if (typeof opt_minOrMax == 'number') {
    min = 0;
    max = opt_minOrMax;
  } else {
    return value;
  }

  return min + value * (max - min);
}

/**
 * Returns a pseudo-random integer in the specified range. The lower bound is
 * inclusive while the upper bound is exclusive.
 */
function aleaNextInt(minOrMax, opt_max) {
  return Math.floor(this.nextFloat(minOrMax, opt_max));
}

/**
 * Returns a new PRNG seeded with the provided value.
 */
function aleaFromSeed(seed) {
  var s0, s1, h, n = 0xefc8249d, v;
  seed = 'X' + (seed || +new Date());
  for (var i = 0; i < 2; i++) {
    for (var j = 0; j < seed.length; j++) {
      n += seed.charCodeAt(j);
      h = 0.02519603282416938 * n;
      n = h >>> 0; h -= n; h *= n;
      n = h >>> 0; h -= n; n += h * 0x100000000;
    }
    v = (n >>> 0) * 2.3283064365386963e-10;
    if (i === 0) s0 = v; else s1 = v;
  }
  return alea(s0, s1, 1);
}

/**
 * Returns a number generator with the specified state.
 */
aleaFromSeed.fromState = function aleaFromState(state) {
  return alea.apply(null, state);
};

module.exports = aleaFromSeed;
