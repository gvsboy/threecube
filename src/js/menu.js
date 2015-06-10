import _ from 'lodash';
import Handlebars from 'handlebars';
import Util from './util';
import Data from './data';
import GeometryData from './data/geometry';

var SELECTED_CLASS = 'selected',
    objectsMenu = document.getElementById('objects'),
    generatePropertiesTemplate = Handlebars.compile(document.getElementById('properties-template').innerHTML),
    generateGeometryTemplate = Handlebars.compile(document.getElementById('geometry-template').innerHTML);

/**
 * A wrapper for getElementsByClassName that only returns a single element.
 * @param  {String} className The class name to find elements by.
 * @return {DOMElement} The first found element.
 */
var getFirstElementByClassName = className => {
  return _.first(document.getElementsByClassName(className));
};

/**
 * Sets a class on a given element, first making sure that the class
 * is removed from a previous element.
 * @param {Function} getter A function used to find a previous element.
 * @param {String} className The class to set.
 * @param {DOMElement} newEl The element receiving the new class.
 * @return {DOMElement} The newEl reference.
 */
var setUniqueClass = _.curry((getter, className, newEl) => {
  var oldEl = getter(className);
  if (oldEl) {
    oldEl.classList.remove(className);
  }
  newEl.classList.add(className);
  return newEl;
});

// Sets a unique 'selected' class on an element.
var swapSelected = setUniqueClass(getFirstElementByClassName, SELECTED_CLASS);

var handleClick = evt => {

  var target = evt.target,
      parent = target.closest('li'),
      panel = parent.querySelector('.panel'),
      label = Util.getLabel(evt);

  // Reset the object if the reset button was pressed.
  if (target.classList.contains('reset')) {
    Data.reset(label);
  }

  // Otherwise, bail if it's not a factory button.
  else if (!target.classList.contains('factory')) {
    return false;
  }

  // Unselect the old, select the new.
  swapSelected(parent);

  // Unattach propertiesMenu before updating.
  if (panel.firstChild) {
    panel.removeChild(panel.firstChild);
  }

  // Align the properties box with the selected button.
  panel.innerHTML = generatePropertiesTemplate(Data.get(label));

  // Pass the event object along.
  return label;
};

var handleInput = evt => {

  var target = evt.target;

  if (target.id === 'input-color') {
    console.log(target.value);
  }
  target.closest('li').querySelector('output').innerHTML = target.value;
  Data.update(Util.getLabel(evt), target.name, target.value);
  return evt;
};

var listenTo = _.curry((handlers, el, type, handler) => {
  var baseHandler = handlers[type];
  if (baseHandler) {
    handler = _.flowRight(handler, baseHandler);
  }
  el.addEventListener(type, handler);
});

var handlers = {
  click: handleClick,
  input: handleInput
};

var generateMenu = () => {
  var data = _.keys(GeometryData);
  document.getElementById('objects').innerHTML = generateGeometryTemplate(data);
};

export default {
  generate: generateMenu,
  listenTo: listenTo(handlers, objectsMenu)
};
