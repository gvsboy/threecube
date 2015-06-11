import _ from 'lodash';

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
  return getLabelFromEventTarget(evt) || evt;
};

// Troubleshooting.
var trace = _.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

export default {
  getLabel,
  trace
};
