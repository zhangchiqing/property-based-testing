var mod = require('./math');
var assert = require('assert');

var test_add = function() {
  assert.equal(mod.add(1, 1), 2);
  assert.equal(mod.add(1, 2), 3);
};

var test_mul = function() {
  assert.equal(mod.mul(1, 1), 1);
  assert.equal(mod.mul(1, 2), 2);
};

describe(__filename, function() {
  it('test_add', test_add);
  it('test_mul', test_mul);
});

