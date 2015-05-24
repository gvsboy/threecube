/**
 * Playing around with THREE.js.
 * Also, practicing FP. Hipster alert!
 */

import THREE from 'three';
import _ from 'lodash';

// An object containing all our object factory methods.
var factories = {

  cube: () => {
    return new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshLambertMaterial({color: 0x00ff00})
    );
  },

  sphere: () => {
    return new THREE.Mesh(
      new THREE.SphereGeometry(1, 32, 32),
      new THREE.MeshLambertMaterial({color: 0x00ff00})
    );
  },

  pointLight: () => {
    var light = new THREE.PointLight(0xffffff);
    light.position.x = 0;
    light.position.y = 10;
    light.position.z = 100;
    return light;
  }

};

// Wrapping the scene object addition method.
var addObject = _.curry((scene, object) => {
  if (object) {
    scene.add(object);
  }
  return object;
});

// Wrapping the scene object removal method.
var removeObject = _.curry((scene, object) => {
  scene.remove(object);
  return object;
});

// Wrapping the object retrieval method.
var getObjectByName = _.curry((scene, name) => {
  return scene.getObjectByName(name);
});

// I guess this is not pure because I'm mutating the object. How else to do this?
// Perhaps not all functions need to be pure.
var nameObject = _.curry((name, object) => {
  object.name = name;
  return object;
});

// Find a factory method by label and attempt to create an object instance.
var createObjectByLabel = _.curry((factories, label) => {
  var factory = factories[label];
  return _.isFunction(factory) && factory();
});

// A little method for extracting factory labels (classes) from events.
// If the input is not an object, return it.
var getLabel = evt => {
  return _.isObject(evt) ? evt.target.className : evt;
};

/**
 * Fancy-schmancy render loop creator. Well, not **too** fancy anyways.
 * Not sure about the best way to handle this in FP, or in a pure way.
 * This is fine for now.
 * @param  {Scene} scene A THREE.js Scene object.
 * @param  {Camera} camera A THREE.js Camera object.
 * @param  {Renderer} renderer A THREE.js renderer.
 * @param  {Function} getter A method for retrieving the main object.
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
  }());
}



// Some crap:
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,

    // This is what we'll call the shape being rendered.
    MAIN_OBJECT = 'mainObject',

    // The three things needed to render a scene:
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

// Some more crap:
camera.position.z = 5;
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);



// OK LET'S HAVE FUN.

// Generic object adding method.
var addObjectByLabel = _.flowRight(addObject(scene), createObjectByLabel(factories), getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _.flowRight(nameObject(MAIN_OBJECT), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _.flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _.partial(getObjectByName, scene, MAIN_OBJECT);

// Jank, but I'm not sure how to do better yet. The click handler
// for swapping out the main object with a new one.
var swapObjectOnClick = _.flowRight(addAndNameObjectByLabel, evt => {
  removeObjectByName(scene, MAIN_OBJECT);
  return evt;
});

// Listen for button clicks.
window.document
  .getElementById('list-actions')
  .addEventListener('click', swapObjectOnClick);

// Shed some light on the subject.
addObjectByLabel('pointLight');

// Create the default shape.
addAndNameObjectByLabel('cube');

// Start rendering that shiz!
startRenderLoop(scene, camera, renderer, getMainObject);
