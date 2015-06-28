/**
 * Creates a pseudo-random value generator. Takes two floating point numbers
 * in the range [0, 1) for seeding the generator.
 *
 * This is an adapted version of Johannes Baagøe's Alea algorithm.
 * https://github.com/nquinlan/better-random-numbers-for-javascript-mirror
 */
function alea(s0, s1, c) {
  if (!s0 && !s1) {
    s0 = new Date() / 8640000000000000;
    s1 = 1 - s0;
  }
  if (!c) c = 1;

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

alea.fromState = function aleaFromState(state) {
  return alea.apply(null, state);
};

module.exports = alea;
