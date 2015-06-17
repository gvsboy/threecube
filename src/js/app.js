/**
 * Playing around with THREE.js.
 * Also, practicing FP. Hipster alert!
 */

import THREE from 'three';
import _ from 'lodash';
import Factory from './factory';
import Menu from './menu';
import Util from './util';

// Wrapping the scene object addition method.
// But I guess this isn't pure because we're mutating the scene, right? Eh.
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
  }());
}



// Some crap:
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,

    // This is what we'll call the shape being rendered.
    OBJECT_NAME = 'mainObject',
    DEFAULT_OBJECT = 'BoxGeometry',

    // The three things needed to render a scene:
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

// Some more crap:
camera.position.z = 100;
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);

document.getElementById('camera').addEventListener('mousedown', function(evt) {
  var zoom = evt.target.dataset.zoom;
  if (zoom) {
    camera.position.z += parseInt(zoom, 10);
  }
});


// OK LET'S HAVE FUN.

// Generic object adding method.
var addObjectByLabel = _.flowRight(addObject(scene), Factory.createObject, Util.getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _.flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _.flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _.partial(getObjectByName, scene, OBJECT_NAME);

// Removes the main object from the stage.
var removeMainObject = _.partial(removeObjectByName, scene, OBJECT_NAME);

var listener = evt => {
  if (evt) {
    removeMainObject();
    addAndNameObjectByLabel(evt);
  }
};

Menu.listenTo('click', listener);
Menu.listenTo('input', listener);
Menu.listenTo('change', listener);
Menu.generate();

// Shed some light on the subject. Gotta integrate this with factory.js.
var light = light = new THREE.PointLight(0xffffff);
light.position.x = 0;
light.position.y = 10;
light.position.z = 100;
addObject(scene, light);



// Create the default shape.
addAndNameObjectByLabel(DEFAULT_OBJECT);

// Start rendering that shiz!
startRenderLoop(scene, camera, renderer, getMainObject);
