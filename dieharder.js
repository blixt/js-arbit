/*
 * DieHarder test suite
 *
 * This will test the PRNG using DieHarder. Note that this will take a really
 * long time, and that it will use up about 5 GB of disk space.
 *
 * For information on how to install DieHarder:
 * https://gist.github.com/blixt/9abfafdd0ada0f4f6f26
 *
 * For more information about DieHarder, visit:
 * http://www.phy.duke.edu/~rgb/General/dieharder.php
 */

var exec = require('child_process').exec;
var fs = require('fs');

var arbit = require('./');
var random = arbit();

console.log('Creating DieHarder test data (~5 GB)');
var COUNT = 500000000;
var out = fs.openSync('./dieharder.txt', 'w');
fs.writeSync(out, '# arbit\n');
fs.writeSync(out, '# seed: ' + random.getState() + '\n');
fs.writeSync(out, 'type: d\n');
fs.writeSync(out, 'count: ' + COUNT + '\n');
fs.writeSync(out, 'numbit: 32\n');

var twoPercent = Math.round(COUNT / 50);
for (var i = 0; i < COUNT; i++) {
  if (i % twoPercent == 0) {
    var percent = Math.round(i / twoPercent) * 2;
    process.stdout.write(percent % 10 ? '…' : percent + '%');
  }
  var num = (random() * 4294967296 >>> 0).toString();
  fs.writeSync(out, '          '.slice(0, 10 - num.length) + num + '\n');
}
process.stdout.write('DONE\n');

fs.closeSync(out);

console.log('Running DieHarder test');
exec('dieharder -g 202 -f dieharder.txt -a', function (error, stdout, stderr) {
  console.log(stdout);
  console.log(stderr);
});
