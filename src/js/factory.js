import THREE from 'three';
import _ from 'lodash';
import Data from './data';

function generateInstance(label, args) {

  var constructor = THREE[label];

  if (_.isFunction(constructor)) {
    function F() {
      return constructor.apply(this, args);
    }
    F.prototype = constructor.prototype;
    return new F();
  }

  return null;
}

// Basic mesh material.
var mesh = new THREE.MeshLambertMaterial({color: '#00ff00'});

var createObjectByLabel = (label) => {
  var instance = generateInstance(label, Data.getArgs(label));
  if (instance) {
    return new THREE.Mesh(instance, mesh);
  }
  return null;
};

export default {
  createObject: createObjectByLabel
};
