import _ from 'lodash';
import Util from './util';
import GeometryData from './data/geometry';

// Default values for some data object keys.
// Maybe this should be in geometry data...
var defaults = {
  args: {
    value: 1,
    step: 0.1,
    min: 0.1,
    max: 10
  },
  color: '#00ff00'
};

// Nerd alert.
//var map = _.rearg(_.curry(_.map, 2), [1, 0]);
var map = _(_.map).rearg([1, 0]).curry(2).value();

/**
 * Deeply clones a node from a data object and returns the result.
 * @param {Object} data The base data object.
 * @param {String} label The key to clone.
 * @return {Object} The freshly-cloned data.
 */
var cloneBaseDataByLabel = _.curry((data, label) => {
  return _.cloneDeep(data[label]);
});

window._ = _;
/**
 * Merges nodes in a data map with provided defaults.
 * @param {Object} defaults A shallow map of default values to merge.
 * @param {Object} data The base data you wish to decorate.
 * @return {Object} The decorated data.
 */
var decorateDataWithDefaults = _.curry((defaults, data) => {

  // Loose properties.
  _.defaults(data, defaults);

  // Set arg defauts.
  _.map(data.args, value => {
    _.defaults(value, defaults.args);
  });

  return data;
});

/**
 * Retrieves an object's default data by label. This includes argument names,
 * initial values, and value boundaries.
 * @param {String} label The object label to retrieve data for.
 * @return {Object} A map of all the default values.
 */
var getDefault = _.flowRight(decorateDataWithDefaults(defaults), cloneBaseDataByLabel(GeometryData));

var cache = {};
var get = (cache, label) => cache[label];
var set = (cache, label, data) => {
  cache[label] = data;
  return data;
};
var update = (cache, label, key, value) => {
  _.find(cache[label].args, {name: key}).value = value;
  return cache[label];
};

var getCache = _.partial(get, cache);
var setCache = _.partial(set, cache);
var updateCache = _.partial(update, cache);

var setDefault = label => {
  return setCache(label, getDefault(label));
};

var getArgumentValues = data => _.pluck(data, 'value');

var prop = _.curry((key, object) => object[key]);

/**
 * Retrieves data by label or sets the default data for the label
 * and returns it.
 * @param {String} label The label to retrieve data for.
 * @return {Object} The data payload.
 */
var getOrGetAndSetDefault = label => getCache(label) || setDefault(label);

/**
 * Retrieves the ordered argument values for an object by label.
 * @param {String} label The object label to retrieve default args for.
 * @return {Array} The ordered collection of values.
 */
var getArgumentList = _.flowRight(getArgumentValues, prop('args'), getOrGetAndSetDefault);

// Hacky
var updateColor = (label, color) => {
  cache[label].color = color;
};

export default {
  get: getOrGetAndSetDefault,
  getArgs: getArgumentList,
  update: updateCache,
  reset: setDefault,
  updateColor
}
