import _ from 'lodash';
import Handlebars from 'handlebars';
import Util from './util';
import Data from './data';

var SELECTED_CLASS = 'selected',
    objectsMenu = document.getElementById('objects'),
    generateTemplate = Handlebars.compile(document.getElementById('properties-template').innerHTML);

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
      parent = target.parentNode,
      panel = parent.querySelector('.panel');

  // Right now, bail if it's not a factory button.
  if (!target.classList.contains('factory')) {
    return false;
  }

  // Unselect the old, select the new.
  swapSelected(parent);

  // Unattach propertiesMenu before updating.
  if (panel.firstChild) {
    panel.removeChild(panel.firstChild);
  }

  // Align the properties box with the selected button.
  panel.innerHTML = generateTemplate(Data.getAllDefaults(Util.getLabel(evt)));

  // Pass the event object along.
  return evt;
};

var handleInput = _.debounce(evt => {
  console.log(evt.target.value);
  return evt;
}, 100);

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

export default {
  listenTo: listenTo(handlers, objectsMenu)
};
