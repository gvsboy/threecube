import _ from 'lodash';

var capitalCamelCase = _.flowRight(_.capitalize, _.camelCase);

function getFactoryValue(el) {
  return el.dataset.factory;
}

function getLabelFromEventTarget(evt) {
  var target = evt && evt.target;
  if (target) {
    return getFactoryValue(target) || getFactoryValue(target.closest('.selected').querySelector('button'));
  }
  return null;
}

// A little method for extracting factory labels (classes) from events.
// If the input is not an object, return it.
var getLabel = evt => {
  return capitalCamelCase(getLabelFromEventTarget(evt)) || evt;
};

export default {
  getLabel
};
