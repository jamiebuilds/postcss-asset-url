var postcss = require('postcss');
var assert  = require('assert');

var assetUrl = require('./');

function test(css, options) {
  return postcss()
    .use(assetUrl(options))
    .process(css)
    .css;
}

describe('postcss-asset-url', function() {
  it('should replace asset-url()', function() {
    var options = { map: { image: '/path/to/images/' } };
    var input = '.foo { background-image: url(asset-url("image", "background.png")); }';
    var output = '.foo { background-image: url(/path/to/images/background.png); }';

    assert.equal(test(input, options), output);
  });

  it('should throw with wrong number of args', function() {
    assert.throws(function() {
      test('.foo { background-image: url(asset-url("arg1")); }');
    }, /Wrong number of arguments passed/);

    assert.throws(function() {
      test('.foo { background-image: url(asset-url("arg1", "arg2", "arg3")); }');
    }, /Wrong number of arguments passed/);
  });

  it('should throw with unmapped type', function() {
    var options = { map: {} };
    var input = '.foo { background-image: url(asset-url("image", "background.png")); }';

    assert.throws(function() {
      test(input, options);
    }, /Invalid type/);
  });
});
