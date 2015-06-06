(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

/**
 * Playing around with THREE.js.
 * Also, practicing FP. Hipster alert!
 */

var _THREE = require('three');

var _THREE2 = _interopRequireDefault(_THREE);

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _Factory = require('./factory');

var _Factory2 = _interopRequireDefault(_Factory);

var _Menu = require('./menu');

var _Menu2 = _interopRequireDefault(_Menu);

var _Util = require('./util');

var _Util2 = _interopRequireDefault(_Util);

// Troubleshooting.
var trace = _import2['default'].curry(function (tag, x) {
  console.log(tag, x);
  return x;
});

// Wrapping the scene object addition method.
// But I guess this isn't pure because we're mutating the scene, right? Eh.
var addObject = _import2['default'].curry(function (scene, object) {
  if (object) {
    scene.add(object);
  }
  return object;
});

// Wrapping the scene object removal method.
var removeObject = _import2['default'].curry(function (scene, object) {
  scene.remove(object);
  return object;
});

// Wrapping the object retrieval method.
var getObjectByName = _import2['default'].curry(function (scene, name) {
  return scene.getObjectByName(name);
});

// I guess this is not pure because I'm mutating the object. How else to do this?
// Perhaps not all functions need to be pure.
var nameObject = _import2['default'].curry(function (name, object) {
  if (object) {
    object.name = name;
  }
  return object;
});

/**
 * Fancy-schmancy render loop creator. Well, not **too** fancy anyways.
 * Not sure about the best way to handle this in FP, or in a pure way.
 * This is fine for now.
 * @param {Scene} scene A THREE.js Scene object.
 * @param {Camera} camera A THREE.js Camera object.
 * @param {Renderer} renderer A THREE.js renderer.
 * @param {Function} getter A method for retrieving the main object.
 */
function startRenderLoop(scene, camera, renderer, getter) {
  (function loop() {
    var object = getter();
    if (object) {
      object.rotation.x += 0.02;
      object.rotation.y += 0.02;
    }
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
  })();
}

// Some crap:
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,

// This is what we'll call the shape being rendered.
OBJECT_NAME = 'mainObject',
    DEFAULT_OBJECT = 'BoxGeometry',

// The three things needed to render a scene:
scene = new _THREE2['default'].Scene(),
    camera = new _THREE2['default'].PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),
    renderer = new _THREE2['default'].WebGLRenderer();

// Some more crap:
camera.position.z = 5;
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

// OK LET'S HAVE FUN.

// Generic object adding method.
var addObjectByLabel = _import2['default'].flowRight(addObject(scene), trace('ok'), _Factory2['default'].createObject, _Util2['default'].getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _import2['default'].flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _import2['default'].flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _import2['default'].partial(getObjectByName, scene, OBJECT_NAME);

// Removes the main object from the stage.
var removeMainObject = _import2['default'].partial(removeObjectByName, scene, OBJECT_NAME);

// Is there a way to invoke a function but "pass through" the argument
// from the function before it to the function after it?
_Menu2['default'].listenTo('click', function (evt) {
  if (evt) {
    removeMainObject();
    addAndNameObjectByLabel(evt);
  }
});

_Menu2['default'].listenTo('input', _import2['default'].debounce(function (evt) {
  console.log('input here:', evt);
  removeMainObject();
  addAndNameObjectByLabel(evt);
}, 100));

// Shed some light on the subject. Gotta integrate this with factory.js.
var light = light = new _THREE2['default'].PointLight(16777215);
light.position.x = 0;
light.position.y = 10;
light.position.z = 100;
addObject(scene, light);

// Create the default shape.
addAndNameObjectByLabel(DEFAULT_OBJECT);

// Start rendering that shiz!
startRenderLoop(scene, camera, renderer, getMainObject);

},{"./factory":3,"./menu":4,"./util":5,"lodash":"lodash","three":"three"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var data = {

  BoxGeometry: [{
    name: 'width'
  }, {
    name: 'height'
  }, {
    name: 'depth'
  }, {
    name: 'widthSegments'
  }, {
    name: 'heightSegments'
  }, {
    name: 'depthSegments'
  }],

  SphereGeometry: [{
    name: 'radius'
  }, {
    name: 'widthSegments',
    value: 32
  }, {
    name: 'heightSegments',
    value: 32
  }, {
    name: 'phiStart',
    value: 0
  }, {
    name: 'phiLength',
    value: Math.PI * 2
  }, {
    name: 'thetaStart',
    value: 0
  }, {
    name: 'thetaLength',
    value: Math.PI
  }],

  CylinderGeometry: [{
    name: 'radiusTop'
  }, {
    name: 'radiusBottom'
  }, {
    name: 'height',
    value: 3
  }, {
    name: 'radiusSegments',
    value: 32
  }, {
    name: 'heightSegments'
  }, {
    name: 'openEnded',
    value: false
  }, {
    name: 'thetaStart',
    value: 0
  }, {
    name: 'thetaLength',
    value: Math.PI * 2
  }],

  CircleGeometry: [{
    name: 'radius'
  }, {
    name: 'segments',
    value: 32
  }, {
    name: 'thetaStart',
    value: 0
  }, {
    name: 'thetaLength',
    value: Math.PI * 2
  }],

  PointLight: [{
    name: 'hex',
    value: 16777215
  }]

};

// Default values for some data object keys.
var defaults = {
  value: 1,
  min: 1,
  max: 10
};

// Nerd alert.
//var map = _.rearg(_.curry(_.map, 2), [1, 0]);
var map = _import2['default'](_import2['default'].map).rearg([1, 0]).curry(2).value();

var getDataByLabel = _import2['default'].curry(function (data, label) {
  return data[label];
});

var getParameterByNameOrDefault = _import2['default'].curry(function (defaults, name, param) {
  return _import2['default'].isUndefined(param[name]) ? defaults[name] : param[name];
});

var getValueParameter = getParameterByNameOrDefault(defaults, 'value');

var decorateDataWithDefaults = _import2['default'].curry(function (defaults, data) {
  return _import2['default'].map(data, function (arg) {
    return _import2['default'].defaults(arg, defaults);
  });
});

exports['default'] = {

  /**
   * Retrieves the ordered default argument values for an object by label.
   * @param {String} label The object label to retrieve default args for.
   * @return {Array} The ordered collection of values.
   */
  getDefaultArgs: _import2['default'].flowRight(map(getValueParameter), getDataByLabel(data)),

  /**
   * Retrieves an object's default data by label. This includes argument names,
   * initial values, and value boundaries.
   * @param {String} label The object label to retrieve data for.
   * @return {Object} A map of all the default values.
   */
  getAllDefaults: _import2['default'].flowRight(decorateDataWithDefaults(defaults), getDataByLabel(data))
};
module.exports = exports['default'];

},{"lodash":"lodash"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _THREE = require('three');

var _THREE2 = _interopRequireDefault(_THREE);

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _Data = require('./data');

var _Data2 = _interopRequireDefault(_Data);

function generateInstance(label, args) {

  var constructor = _THREE2['default'][label];

  if (_import2['default'].isFunction(constructor)) {
    var F = function () {
      return constructor.apply(this, args);
    };

    F.prototype = constructor.prototype;
    return new F();
  }

  return null;
}

// Basic mesh material.
var mesh = new _THREE2['default'].MeshLambertMaterial({ color: 65280 });

var createObjectByLabelAndArgs = function createObjectByLabelAndArgs(label, args) {
  var instance = generateInstance(label, args || _Data2['default'].getDefaultArgs(label));
  if (instance) {
    return new _THREE2['default'].Mesh(instance, mesh);
  }
  return null;
};

exports['default'] = {
  createObject: createObjectByLabelAndArgs
};
module.exports = exports['default'];

},{"./data":2,"lodash":"lodash","three":"three"}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _Handlebars = require('handlebars');

var _Handlebars2 = _interopRequireDefault(_Handlebars);

var _Util = require('./util');

var _Util2 = _interopRequireDefault(_Util);

var _Data = require('./data');

var _Data2 = _interopRequireDefault(_Data);

var SELECTED_CLASS = 'selected',
    objectsMenu = document.getElementById('objects'),
    generateTemplate = _Handlebars2['default'].compile(document.getElementById('properties-template').innerHTML);

/**
 * A wrapper for getElementsByClassName that only returns a single element.
 * @param  {String} className The class name to find elements by.
 * @return {DOMElement} The first found element.
 */
var getFirstElementByClassName = function getFirstElementByClassName(className) {
  return _import2['default'].first(document.getElementsByClassName(className));
};

/**
 * Sets a class on a given element, first making sure that the class
 * is removed from a previous element.
 * @param {Function} getter A function used to find a previous element.
 * @param {String} className The class to set.
 * @param {DOMElement} newEl The element receiving the new class.
 * @return {DOMElement} The newEl reference.
 */
var setUniqueClass = _import2['default'].curry(function (getter, className, newEl) {
  var oldEl = getter(className);
  if (oldEl) {
    oldEl.classList.remove(className);
  }
  newEl.classList.add(className);
  return newEl;
});

// Sets a unique 'selected' class on an element.
var swapSelected = setUniqueClass(getFirstElementByClassName, SELECTED_CLASS);

var handleClick = function handleClick(evt) {

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
  panel.innerHTML = generateTemplate(_Data2['default'].getAllDefaults(_Util2['default'].getLabel(evt)));

  // Pass the event object along.
  return evt;
};

var handleInput = _import2['default'].debounce(function (evt) {
  console.log(evt.target.value);
  return evt;
}, 100);

var listenTo = _import2['default'].curry(function (handlers, el, type, handler) {
  var baseHandler = handlers[type];
  if (baseHandler) {
    handler = _import2['default'].flowRight(handler, baseHandler);
  }
  el.addEventListener(type, handler);
});

var handlers = {
  click: handleClick,
  input: handleInput
};

exports['default'] = {
  listenTo: listenTo(handlers, objectsMenu)
};
module.exports = exports['default'];

},{"./data":2,"./util":5,"handlebars":"handlebars","lodash":"lodash"}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var capitalCamelCase = _import2['default'].flowRight(_import2['default'].capitalize, _import2['default'].camelCase);

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
var getLabel = function getLabel(evt) {
  return capitalCamelCase(getLabelFromEventTarget(evt)) || evt;
};

exports['default'] = {
  getLabel: getLabel
};
module.exports = exports['default'];

},{"lodash":"lodash"}]},{},[1]);
