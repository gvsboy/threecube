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

// An object containing all our object factory methods.
var factories = {

  cube: function cube() {
    return new _THREE2['default'].Mesh(new _THREE2['default'].BoxGeometry(1, 1, 1), new _THREE2['default'].MeshLambertMaterial({ color: 65280 }));
  },

  sphere: function sphere() {
    return new _THREE2['default'].Mesh(new _THREE2['default'].SphereGeometry(1, 32, 32), new _THREE2['default'].MeshLambertMaterial({ color: 65280 }));
  },

  cylinder: function cylinder() {
    return new _THREE2['default'].Mesh(new _THREE2['default'].CylinderGeometry(1, 1, 3, 32), new _THREE2['default'].MeshLambertMaterial({ color: 65280 }));
  },

  circle: function circle() {
    return new _THREE2['default'].Mesh(new _THREE2['default'].CircleGeometry(1, 32), new _THREE2['default'].MeshLambertMaterial({ color: 65280 }));
  },

  pointLight: function pointLight() {
    var light = new _THREE2['default'].PointLight(16777215);
    light.position.x = 0;
    light.position.y = 10;
    light.position.z = 100;
    return light;
  }

};

// Wrapping the scene object addition method.
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

// Find a factory method by label and attempt to create an object instance.
var createObjectByLabel = _import2['default'].curry(function (factories, label) {
  var factory = factories[label];
  return _import2['default'].isFunction(factory) && factory();
});

// A little method for extracting factory labels (classes) from events.
// If the input is not an object, return it.
var getLabel = function getLabel(evt) {
  return _import2['default'].isObject(evt) ? evt.target.className : evt;
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

// Some crap:
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,

// This is what we'll call the shape being rendered.
OBJECT_NAME = 'mainObject',
    DEFAULT_OBJECT = 'cube',

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
var addObjectByLabel = _import2['default'].flowRight(addObject(scene), createObjectByLabel(factories), getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _import2['default'].flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _import2['default'].flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _import2['default'].partial(getObjectByName, scene, OBJECT_NAME);

// Jank, but I'm not sure how to do better yet. The click handler
// for swapping out the main object with a new one.
var swapObjectOnClick = _import2['default'].flowRight(addAndNameObjectByLabel, function (evt) {
  removeObjectByName(scene, OBJECT_NAME);
  return evt;
});

var test = createObjectByLabel(factories, 'cube');

// Listen for button clicks.
window.document.getElementById('factory').addEventListener('click', swapObjectOnClick);

// Shed some light on the subject.
addObjectByLabel('pointLight');

// Create the default shape.
addAndNameObjectByLabel(DEFAULT_OBJECT);

// Start rendering that shiz!
//startRenderLoop(scene, camera, renderer, getMainObject);

},{"lodash":"lodash","three":"three"}]},{},[1]);
