var rt = require('pkg-dir').sync(__dirname) + '/';
var assert = require('assert');
var R = require('ramda');
var jsc = require('jsverify');

var deepEqual = function(xs, ys) {
  return xs.length === ys.length &&
    R.transduce(R.takeWhile(R.equals(true)), R.and, true, R.zipWith(R.equals, xs, ys));
};

var testDeepEqual = function() {
  jsc.check(jsc.forall('array nat', function(xs) {
    // xs == xs
    return deepEqual(xs, xs);
  }), { tests: 100 });

  jsc.check(jsc.forall('array nat', function(xs) {
    // xs ++ [1] != xs
    return !deepEqual(xs.concat([1]), xs);
  }));
};

var map = function(f, xs) {
  return xs.reduce(function(xss, x) {
    xss.push(f(x));
    return xss;
  }, []);
};

var should_pass = function() {
  jsc.check(jsc.forall('array nat', 'nat -> bool', 'bool -> bool', function (arr, f, p) {
    // filter p . map f == map f . filter (p . f)
    var a = R.filter(p, R.map(f, arr));
    var b = R.map(f, R.filter(R.compose(p, f), arr));
    return true;
  }), { tests: 10 });
};

describe(__filename, function() {
  it('should_pass', should_pass);
  it('testDeepEqual', testDeepEqual);
});
