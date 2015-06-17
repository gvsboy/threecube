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

var createObjectByLabel = label => {

  var instance = generateInstance(label, Data.getArgs(label)),
      data = Data.get(label);

  if (data.texture) {
    var texture = THREE.ImageUtils.loadTexture('img/' + data.texture + '.jpg');
    console.log('loaded texture:', texture);

    //texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
    //texture.anisotropy = 16;

    var imageMaterial = new THREE.MeshPhongMaterial({
      alphaTest: 0.5,
      color: 0xffffff,
      specular: 0x030303,
      emissive: 0x111111,
      shiness: 10,
      map: texture,
      side: THREE.DoubleSide
    });
  }

  if (instance) {
    return new THREE.Mesh(instance, imageMaterial || new THREE.MeshLambertMaterial({color: data.color}));
  }

  return null;
};

export default {
  createObject: createObjectByLabel
};
