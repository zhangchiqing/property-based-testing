var mod = require('./math');
var jsc = require('jsverify');

var test_add = function() {
  jsc.check(jsc.forall('nat', 'nat', 'nat', function(x, y, z) {
    // (x + y) + z === x + (y + z)
    return mod.add(mod.add(x, y), z) === mod.add(x, mod.add(y, z));
  }));
};

var test_mul = function() {
  jsc.check(jsc.forall('nat', 'nat', function(x, y) {
    // (x + y) * (x + y) == x * x + y * y + 2 * x * y
    return mod.mul(mod.add(x, y), mod.add(x, y)) ===
      mod.add(mod.add(mod.mul(x, x), mod.mul(y, y)), mod.mul(2, mod.mul(x , y)));
  }));
};

describe(__filename, function() {
  it('test_add', test_add);
  it('test_mul', test_mul);
});
