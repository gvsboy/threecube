/**
 * Playing around with THREE.js.
 * Also, practicing FP. Hipster alert!
 */

import THREE from 'three';
import _ from 'lodash';
import {createObjectByLabel} from './factory';

// Troubleshooting.
var trace = _.curry((tag, x) => {
  console.log(tag, x);
  return x;
});

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
  object.name = name;
  return object;
});

// A little method for extracting factory labels (classes) from events.
// If the input is not an object, return it.
var getLabel = evt => {
  return _.isObject(evt) ? _.capitalize(_.camelCase(evt.target.className.split(' ')[0])) : evt;
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
  }());
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
    scene = new THREE.Scene(),
    camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000),
    renderer = new THREE.WebGLRenderer();

// Some more crap:
camera.position.z = 5;
renderer.setSize(WIDTH, HEIGHT);
document.body.appendChild(renderer.domElement);



// OK LET'S HAVE FUN.

// Generic object adding method.
var addObjectByLabel = _.flowRight(addObject(scene), createObjectByLabel, getLabel);

// Adds an object and sets the name as 'main'.
var addAndNameObjectByLabel = _.flowRight(nameObject(OBJECT_NAME), addObjectByLabel);

// Remove an object by name;
var removeObjectByName = _.flowRight(removeObject(scene), getObjectByName);

// Retrieve the main object from the scene.
var getMainObject = _.partial(getObjectByName, scene, OBJECT_NAME);

// Jank, but I'm not sure how to do better yet. The click handler
// for swapping out the main object with a new one.
var swapObjectOnClick = _.flowRight(addAndNameObjectByLabel, horribleDOMMutationOnClick);

// Listen for button clicks.
var factoryEl = window.document.getElementById('factory')
factoryEl.addEventListener('click', swapObjectOnClick);
// let's throttle this bad boy.
factoryEl.addEventListener('input', _.debounce(updateObjectOnInput, 100));

// Shed some light on the subject.
var light = light = new THREE.PointLight(0xffffff);
light.position.x = 0;
light.position.y = 10;
light.position.z = 100;
addObject(scene, light);

// Create the default shape.
addAndNameObjectByLabel(DEFAULT_OBJECT);

// Start rendering that shiz!
startRenderLoop(scene, camera, renderer, getMainObject);
