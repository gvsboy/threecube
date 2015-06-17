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
camera.position.z = 100;
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

document.getElementById('camera').addEventListener('mousedown', function (evt) {
  var zoom = evt.target.dataset.zoom;
  if (zoom) {
    camera.position.z += parseInt(zoom, 10);
  }
});

// OK LET'S HAVE FUN.

// Generic object adding method.
var addObjectByLabel = _import2['default'].flowRight(addObject(scene), _Factory2['default'].createObject, _Util2['default'].getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _import2['default'].flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _import2['default'].flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _import2['default'].partial(getObjectByName, scene, OBJECT_NAME);

// Removes the main object from the stage.
var removeMainObject = _import2['default'].partial(removeObjectByName, scene, OBJECT_NAME);

var listener = function listener(evt) {
  if (evt) {
    removeMainObject();
    addAndNameObjectByLabel(evt);
  }
};

_Menu2['default'].listenTo('click', listener);
_Menu2['default'].listenTo('input', listener);
_Menu2['default'].listenTo('change', listener);
_Menu2['default'].generate();

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

},{"./factory":4,"./menu":5,"./util":6,"lodash":"lodash","three":"three"}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

var _Util = require('./util');

var _Util2 = _interopRequireDefault(_Util);

var _GeometryData = require('./data/geometry');

var _GeometryData2 = _interopRequireDefault(_GeometryData);

// Default values for some data object keys.
// Maybe this should be in geometry data...
var defaults = {
  args: {
    value: 30,
    step: 0.1,
    min: 0.1,
    max: 100
  },
  color: '#00ff00'
};

// Nerd alert.
//var map = _.rearg(_.curry(_.map, 2), [1, 0]);
var map = _import2['default'](_import2['default'].map).rearg([1, 0]).curry(2).value();

/**
 * Deeply clones a node from a data object and returns the result.
 * @param {Object} data The base data object.
 * @param {String} label The key to clone.
 * @return {Object} The freshly-cloned data.
 */
var cloneBaseDataByLabel = _import2['default'].curry(function (data, label) {
  return _import2['default'].cloneDeep(data[label]);
});

window._ = _import2['default'];
/**
 * Merges nodes in a data map with provided defaults.
 * @param {Object} defaults A shallow map of default values to merge.
 * @param {Object} data The base data you wish to decorate.
 * @return {Object} The decorated data.
 */
var decorateDataWithDefaults = _import2['default'].curry(function (defaults, data) {

  // Loose properties.
  _import2['default'].defaults(data, defaults);

  // Set arg defauts.
  _import2['default'].map(data.args, function (value) {
    _import2['default'].defaults(value, defaults.args);
  });

  return data;
});

/**
 * Retrieves an object's default data by label. This includes argument names,
 * initial values, and value boundaries.
 * @param {String} label The object label to retrieve data for.
 * @return {Object} A map of all the default values.
 */
var getDefault = _import2['default'].flowRight(decorateDataWithDefaults(defaults), cloneBaseDataByLabel(_GeometryData2['default']));

var cache = {};
var get = function get(cache, label) {
  return cache[label];
};
var set = function set(cache, label, data) {
  cache[label] = data;
  return data;
};
var update = function update(cache, label, key, value) {
  _import2['default'].find(cache[label].args, { name: key }).value = value;
  return cache[label];
};

var getCache = _import2['default'].partial(get, cache);
var setCache = _import2['default'].partial(set, cache);
var updateCache = _import2['default'].partial(update, cache);

var setDefault = function setDefault(label) {
  return setCache(label, getDefault(label));
};

var getArgumentValues = function getArgumentValues(data) {
  return _import2['default'].pluck(data, 'value');
};

var prop = _import2['default'].curry(function (key, object) {
  return object[key];
});

/**
 * Retrieves data by label or sets the default data for the label
 * and returns it.
 * @param {String} label The label to retrieve data for.
 * @return {Object} The data payload.
 */
var getOrGetAndSetDefault = function getOrGetAndSetDefault(label) {
  return getCache(label) || setDefault(label);
};

/**
 * Retrieves the ordered argument values for an object by label.
 * @param {String} label The object label to retrieve default args for.
 * @return {Array} The ordered collection of values.
 */
var getArgumentList = _import2['default'].flowRight(getArgumentValues, prop('args'), getOrGetAndSetDefault);

var updateProp = function updateProp(label, prop, value) {
  cache[label][prop] = value;
};

exports['default'] = {
  get: getOrGetAndSetDefault,
  getArgs: getArgumentList,
  update: updateCache,
  reset: setDefault,
  updateProp: updateProp
};
module.exports = exports['default'];

},{"./data/geometry":3,"./util":6,"lodash":"lodash"}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = {

  BoxGeometry: {
    args: [{
      name: 'width'
    }, {
      name: 'height'
    }, {
      name: 'depth'
    }, {
      name: 'widthSegments',
      value: 1,
      step: 1,
      min: 1
    }, {
      name: 'heightSegments',
      value: 1,
      step: 1,
      min: 1
    }, {
      name: 'depthSegments',
      value: 1,
      step: 1,
      min: 1
    }]
  },

  SphereGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'widthSegments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'heightSegments',
      value: 16,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'phiStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    }, {
      name: 'phiLength',
      value: Math.PI * 2,
      max: 360
    }, {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    }, {
      name: 'thetaLength',
      value: Math.PI,
      max: 360
    }]
  },

  CylinderGeometry: {
    args: [{
      name: 'radiusTop',
      value: 30,
      max: 100
    }, {
      name: 'radiusBottom',
      value: 30,
      max: 100
    }, {
      name: 'height',
      value: 100,
      max: 200
    }, {
      name: 'radiusSegments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'heightSegments',
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'openEnded',
      value: false
    }, {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    }, {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: 360
    }]
  },

  CircleGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'segments',
      value: 32,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0,
      max: 360
    }, {
      name: 'thetaLength',
      value: Math.PI * 2,
      max: 360
    }]
  },

  DodecahedronGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }]
  },

  IcosahedronGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }]
  },

  OctahedronGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }]
  },

  PlaneGeometry: {
    args: [{
      name: 'width'
    }, {
      name: 'height'
    }, {
      name: 'widthSegments',
      value: 1,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'heightSegments',
      value: 1,
      step: 1,
      min: 1,
      max: 64
    }]
  },

  PlaneBufferGeometry: {
    args: [{
      name: 'width'
    }, {
      name: 'height'
    }, {
      name: 'widthSegments',
      value: 1,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'heightSegments',
      value: 1,
      step: 1,
      min: 1,
      max: 64
    }]
  },

  RingGeometry: {
    args: [{
      name: 'innerRadius',
      value: 20,
      step: 1,
      min: 0
    }, {
      name: 'outerRadius',
      value: 30,
      step: 1,
      min: 0
    }, {
      name: 'thetaSegments',
      value: 32,
      step: 1,
      min: 3,
      max: 64
    }, {
      name: 'phiSegments',
      value: 8,
      step: 1,
      min: 1
    }, {
      name: 'thetaStart',
      value: 0,
      step: 1,
      min: 0
    }, {
      name: 'thetaLength',
      value: Math.PI * 2,
      step: Math.PI / 64,
      max: Math.PI * 2
    }]
  },

  TetrahedronGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'detail',
      value: 0,
      step: 1,
      min: 0,
      max: 4
    }]
  },

  TorusGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'tube',
      value: 10
    }, {
      name: 'radialSegments',
      value: 16,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'tubularSegments',
      value: 7,
      step: 1,
      min: 1,
      max: 100
    }, {
      name: 'arc',
      value: Math.PI * 2
    }]
  },

  TorusKnotGeometry: {
    args: [{
      name: 'radius'
    }, {
      name: 'tube',
      value: 10
    }, {
      name: 'radialSegments',
      value: 16,
      step: 1,
      min: 1,
      max: 64
    }, {
      name: 'tubularSegments',
      value: 64,
      max: 128
    }, {
      name: 'p',
      value: 2
    }, {
      name: 'q',
      value: 3
    }, {
      name: 'heightScale',
      value: 1
    }]
  }

  // ExtrudeGeometry
  // LatheGeometry
  // ParametricGeometry
  // TextGeometry
  // TubeGeometry

};
module.exports = exports['default'];

},{}],4:[function(require,module,exports){
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

var createObjectByLabel = function createObjectByLabel(label) {

  var instance = generateInstance(label, _Data2['default'].getArgs(label)),
      data = _Data2['default'].get(label);

  if (data.texture) {
    var texture = _THREE2['default'].ImageUtils.loadTexture('img/' + data.texture + '.jpg');
    console.log('loaded texture:', texture);

    //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //texture.anisotropy = 16;

    var imageMaterial = new _THREE2['default'].MeshPhongMaterial({
      alphaTest: 0.5,
      color: 16777215,
      specular: 197379,
      emissive: 1118481,
      shiness: 10,
      map: texture,
      side: _THREE2['default'].DoubleSide
    });
  }

  if (instance) {
    return new _THREE2['default'].Mesh(instance, imageMaterial || new _THREE2['default'].MeshLambertMaterial({ color: data.color }));
  }

  return null;
};

exports['default'] = {
  createObject: createObjectByLabel
};
module.exports = exports['default'];

},{"./data":2,"lodash":"lodash","three":"three"}],5:[function(require,module,exports){
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

var _GeometryData = require('./data/geometry');

var _GeometryData2 = _interopRequireDefault(_GeometryData);

var SELECTED_CLASS = 'selected',
    objectsMenu = document.getElementById('objects'),
    generatePropertiesTemplate = _Handlebars2['default'].compile(document.getElementById('properties-template').innerHTML),
    generateGeometryTemplate = _Handlebars2['default'].compile(document.getElementById('geometry-template').innerHTML);

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
      parent = target.closest('li'),
      panel = parent.querySelector('.panel'),
      label = _Util2['default'].getLabel(evt);

  // Reset the object if the reset button was pressed.
  if (target.classList.contains('reset')) {
    _Data2['default'].reset(label);
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
  panel.innerHTML = generatePropertiesTemplate(_Data2['default'].get(label));

  // Pass the event object along.
  return label;
};

var handleInput = function handleInput(evt) {

  var target = evt.target,
      label = _Util2['default'].getLabel(evt);

  if (target.id === 'input-color') {
    _Data2['default'].updateProp(label, 'color', target.value);
  } else {
    target.closest('li').querySelector('output').innerHTML = target.value;
    _Data2['default'].update(label, target.name, +target.value);
  }
  return evt;
};

var handleChange = function handleChange(evt) {

  var label = _Util2['default'].getLabel(evt);

  if (evt.target.id === 'select-texture') {
    _Data2['default'].updateProp(label, 'texture', evt.target.value);
    return label;
  }

  return null;
};

var listenTo = _import2['default'].curry(function (handlers, el, type, handler) {
  var baseHandler = handlers[type];
  if (baseHandler) {
    handler = _import2['default'].flowRight(handler, baseHandler);
  }
  el.addEventListener(type, handler);
});

var handlers = {
  click: handleClick,
  input: handleInput,
  change: handleChange
};

var generateMenu = function generateMenu() {
  var data = _import2['default'].keys(_GeometryData2['default']);
  document.getElementById('objects').innerHTML = generateGeometryTemplate(data);
};

exports['default'] = {
  generate: generateMenu,
  listenTo: listenTo(handlers, objectsMenu)
};
module.exports = exports['default'];

},{"./data":2,"./data/geometry":3,"./util":6,"handlebars":"handlebars","lodash":"lodash"}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

var _import = require('lodash');

var _import2 = _interopRequireDefault(_import);

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
  return getLabelFromEventTarget(evt) || evt;
};

// Troubleshooting.
var trace = _import2['default'].curry(function (tag, x) {
  console.log(tag, x);
  return x;
});

exports['default'] = {
  getLabel: getLabel,
  trace: trace
};
module.exports = exports['default'];

},{"lodash":"lodash"}]},{},[1]);
