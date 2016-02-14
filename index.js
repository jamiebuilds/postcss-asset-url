var reduceFunctionCall = require('reduce-function-call');
var helpers = require('postcss-message-helpers');
var postcss = require('postcss');

var CONTAINS_ASSET_URL = /asset-url\(.*\)/;
var ARGS_SPLITTER = /, */g;
var QUOTES_REPLACER = /['"]/g;

function parseAssetUrl(str) {
  var args = str.split(ARGS_SPLITTER);

  if (args.length !== 2) {
    throw new SyntaxError('Wrong number of arguments passed to `asset-url()`. Expected 2, got ' + args.length);
  }

  var type = args[0].replace(QUOTES_REPLACER, '');
  var value = args[1].replace(QUOTES_REPLACER, '');

  return {
    type: type,
    value: value
  };
}

function reduceAssetUrl(value, map) {
  return reduceFunctionCall(value, 'asset-url', function(str) {
    var result = parseAssetUrl(str);
    var prefix = map[result.type];

    if (!prefix) {
      throw new SyntaxError('Invalid type for `asset-url()`: ' + result.type);
    }

    return prefix + result.value;
  });
}

function transformRule(node, map) {
  var value = node.value;

  if (!value || !CONTAINS_ASSET_URL.test(value)) {
    return;
  }

  node.value = reduceAssetUrl(value, map);
}

module.exports = postcss.plugin('postcss-asset-url', function(options) {
  options = options || {};

  var map = options.map;

  return function(style) {
    style.walkDecls(function(node) {
      helpers.try(function() {
        transformRule(node, map);
      });
    });
  };
});
