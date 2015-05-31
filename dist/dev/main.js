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

var _createObjectByLabel = require('./factory');

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
  object.name = name;
  return object;
});

// A little method for extracting factory labels (classes) from events.
// If the input is not an object, return it.
var getLabel = function getLabel(evt) {
  return _import2['default'].isObject(evt) ? _import2['default'].capitalize(_import2['default'].camelCase(evt.target.className.split(' ')[0])) : evt;
};

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

/**
 * START THE BUSTED STUFF ==========================================================================================
 */

function horribleDOMMutationOnClick(evt) {

  var SELECTED_CLASS = 'selected',
      selected = document.getElementsByClassName(SELECTED_CLASS)[0],
      properties = document.getElementById('properties'),
      target = evt.target.parentNode;

  // Right now, bail if it's not a factory button.
  if (!evt.target.classList.contains('factory')) {
    return;
  }

  // If there's a selected option, deselect it.
  if (selected) {
    selected.classList.remove(SELECTED_CLASS);
  }

  // Set the target element as selected.
  target.classList.add(SELECTED_CLASS);

  // Align the properties box with the selected button.
  target.querySelector('.panel').appendChild(properties);

  // Remove the previous object from the scene.
  removeObjectByName(scene, OBJECT_NAME);

  // Pass the event object along.
  return evt;
}

function updateObjectOnInput(evt) {
  console.log(evt.target.value);
}

/**
 * END THE BUSTED STUFF ==========================================================================================
 */

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
var addObjectByLabel = _import2['default'].flowRight(addObject(scene), _createObjectByLabel.createObjectByLabel, getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _import2['default'].flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _import2['default'].flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _import2['default'].partial(getObjectByName, scene, OBJECT_NAME);

// Jank, but I'm not sure how to do better yet. The click handler
// for swapping out the main object with a new one.
var swapObjectOnClick = _import2['default'].flowRight(addAndNameObjectByLabel, horribleDOMMutationOnClick);

// Listen for button clicks.
var factoryEl = window.document.getElementById('factory');
factoryEl.addEventListener('click', swapObjectOnClick);
// let's throttle this bad boy.
factoryEl.addEventListener('input', _import2['default'].debounce(updateObjectOnInput, 100));

// Shed some light on the subject.
var light = light = new _THREE2['default'].PointLight(16777215);
light.position.x = 0;
light.position.y = 10;
light.position.z = 100;
addObject(scene, light);

// Create the default shape.
addAndNameObjectByLabel(DEFAULT_OBJECT);

// Start rendering that shiz!
startRenderLoop(scene, camera, renderer, getMainObject);

},{"./factory":3,"lodash":"lodash","three":"three"}],2:[function(require,module,exports){
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
    name: 'widthSegments'
  }, {
    name: 'heightSegments'
  }, {
    name: 'phiStart'
  }, {
    name: 'phiLength'
  }, {
    name: 'thetaStart'
  }, {
    name: 'thetaLength'
  }],

  CylinderGeometry: [{
    name: 'radiusTop'
  }, {
    name: 'radiusBottom'
  }, {
    name: 'height'
  }, {
    name: 'radiusSegments'
  }, {
    name: 'heightSegments'
  }, {
    name: 'openEnded'
  }, {
    name: 'thetaStart'
  }, {
    name: 'thetaLength'
  }],

  CircleGeometry: [{
    name: 'radius'
  }, {
    name: 'segments'
  }, {
    name: 'thetaStart'
  }, {
    name: 'thetaLength'
  }],

  PointLight: [{
    name: 'hex',
    value: 16777215
  }]

};

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
  return param[name] || defaults[name];
});

var getValueParameter = getParameterByNameOrDefault(defaults, 'value');

var getDefaultValuesByLabel = _import2['default'].flowRight(map(getValueParameter), getDataByLabel(data));
exports.getDefaultValuesByLabel = getDefaultValuesByLabel;

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

var _getDefaultValuesByLabel = require('./data');

function generateInstance(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}

function getConstructorFromLabel(label) {
  return _THREE2['default'][label];
}

/*
var generateObject = _.curry((constructorGetterFromLabel, generator) => {
  return function(label, args) {
    return generator(constructorGetterFromLabel(label), args);
  };
});
*/

//var generateObjectInstance = generateObject(generateInstance);

//var generateGeometry = generateObjectInstance(getGeometryConstructorFromLabel);

// Basic mesh material.
var mesh = new _THREE2['default'].MeshLambertMaterial({ color: 65280 });

var factories = {

  boxGeometry: function boxGeometry() {
    return new _THREE2['default'].Mesh(generateInstance(_THREE2['default'].BoxGeometry, [1, 1, 1]), mesh);
  },

  sphere: function sphere() {
    return new _THREE2['default'].Mesh(generateInstance(_THREE2['default'].SphereGeometry, [1, 32, 32]), mesh);
  },

  cylinder: function cylinder() {
    return new _THREE2['default'].Mesh(generateInstance(_THREE2['default'].CylinderGeometry, [1, 1, 3, 32]), mesh);
  },

  circle: function circle() {
    return new _THREE2['default'].Mesh(generateInstance(_THREE2['default'].CircleGeometry, [1, 32]), mesh);
  },

  pointLight: function pointLight() {
    return new _THREE2['default'].PointLight(16777215);
  }

};

// Find a factory method by label and attempt to create an object instance.
var createObjectFromFactoryByLabel = _import2['default'].curry(function (factories, label) {
  var factory = factories[_import2['default'].camelCase(label)];
  return _import2['default'].isFunction(factory) && factory();
});

//export var createObjectByLabel = createObjectFromFactoryByLabel(factories);

var createObjectByLabel = function createObjectByLabel(label) {
  return new _THREE2['default'].Mesh(generateInstance(getConstructorFromLabel(label), _getDefaultValuesByLabel.getDefaultValuesByLabel(label)), mesh);
};
exports.createObjectByLabel = createObjectByLabel;

},{"./data":2,"lodash":"lodash","three":"three"}]},{},[1]);
