var arbit = require('./');
var test = require('tape');

test('callable', function (t) {
  // Random [0, 1) float.
  var value = arbit(1.234, 5.678)();
  t.equal(typeof value, 'number', 'value is number');
  t.ok(value >= 0 && value < 1, 'within expected range');
  t.end();
});

test('nextFloat', function (t) {
  // Random ranged floats.
  var random = arbit(1.234, 5.678), value;
  value = random.nextFloat(1.5, 3.5);
  t.equal(typeof value, 'number', 'value is number');
  t.ok(value >= 1.5 && value < 3.5, 'within expected positive range');
  value = random.nextFloat(-10);
  t.ok(value <= 0 && value > -10, 'within expected negative range');
  t.end();
});

test('nextInt', function (t) {
  // Random integers.
  var random = arbit(1.234, 5.678), value;
  value = random.nextInt(1000, 2000);
  t.equal(typeof value, 'number', 'value is number');
  t.equal(value, ~~value, 'value is an integer');
  t.ok(value >= 1000 && value < 2000, 'within expected positive range');
  t.end();
});

test('reproducible state', function (t) {
  // Create a PRNG and generate 100 values.
  var random1 = arbit(1.234, 5.678);
  for (var i = 0; i < 100; i++) {
    random1();
  }
  // Create a second PRNG with the same state.
  var random2 = arbit.fromState(random1.getState());
  // Ensure that they both generate the same number.
  t.equal(random2(), random1(), 'generated same numbers');
  t.end();
});
