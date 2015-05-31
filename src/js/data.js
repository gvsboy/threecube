import _ from 'lodash';

var data = {

  BoxGeometry: [
    {
      name: 'width'
    },
    {
      name: 'height'
    },
    {
      name: 'depth'
    },
    {
      name: 'widthSegments'
    },
    {
      name: 'heightSegments'
    },
    {
      name: 'depthSegments'
    }
  ],

  SphereGeometry: [
    {
      name: 'radius'
    },
    {
      name: 'widthSegments'
    },
    {
      name: 'heightSegments'
    },
    {
      name: 'phiStart'
    },
    {
      name: 'phiLength'
    },
    {
      name: 'thetaStart'
    },
    {
      name: 'thetaLength'
    }
  ],

  CylinderGeometry: [
    {
      name: 'radiusTop'
    },
    {
      name: 'radiusBottom'
    },
    {
      name: 'height'
    },
    {
      name: 'radiusSegments'
    },
    {
      name: 'heightSegments'
    },
    {
      name: 'openEnded'
    },
    {
      name: 'thetaStart'
    },
    {
      name: 'thetaLength'
    }
  ],

  CircleGeometry: [
    {
      name: 'radius'
    },
    {
      name: 'segments'
    },
    {
      name: 'thetaStart'
    },
    {
      name: 'thetaLength'
    }
  ],

  PointLight : [
    {
      name: 'hex',
      value: 0xffffff
    }
  ]

};

var defaults = {
  value: 1,
  min: 1,
  max: 10
};

// Nerd alert.
//var map = _.rearg(_.curry(_.map, 2), [1, 0]);
var map = _(_.map).rearg([1, 0]).curry(2).value();

var getDataByLabel = _.curry((data, label) => {
  return data[label];
});

var getParameterByNameOrDefault = _.curry((defaults, name, param) => {
  return param[name] || defaults[name];
});

var getValueParameter = getParameterByNameOrDefault(defaults, 'value');

export var getDefaultValuesByLabel = _.flowRight(map(getValueParameter), getDataByLabel(data));
