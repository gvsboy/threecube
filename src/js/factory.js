import THREE from 'three';
import _ from 'lodash';
import {getDefaultValuesByLabel} from './data';

function generateInstance(constructor, args) {
  function F() {
    return constructor.apply(this, args);
  }
  F.prototype = constructor.prototype;
  return new F();
}

function getConstructorFromLabel(label) {
  return THREE[label];
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
var mesh = new THREE.MeshLambertMaterial({color: 0x00ff00});

var factories = {

  boxGeometry() {
    return new THREE.Mesh(
      generateInstance(THREE.BoxGeometry, [1, 1, 1]),
      mesh
    );
  },

  sphere() {
    return new THREE.Mesh(
      generateInstance(THREE.SphereGeometry, [1, 32, 32]),
      mesh
    );
  },

  cylinder() {
    return new THREE.Mesh(
      generateInstance(THREE.CylinderGeometry, [1, 1, 3, 32]),
      mesh
    )
  },

  circle() {
    return new THREE.Mesh(
      generateInstance(THREE.CircleGeometry, [1, 32]),
      mesh
    );
  },

  pointLight() {
    return new THREE.PointLight(0xffffff);
  }

};

// Find a factory method by label and attempt to create an object instance.
var createObjectFromFactoryByLabel = _.curry((factories, label) => {
  var factory = factories[_.camelCase(label)];
  return _.isFunction(factory) && factory();
});

//export var createObjectByLabel = createObjectFromFactoryByLabel(factories);


export var createObjectByLabel = label => {
  return new THREE.Mesh(
    generateInstance(getConstructorFromLabel(label), getDefaultValuesByLabel(label)),
    mesh
  );
};


